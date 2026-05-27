'use client';

import React, { ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs, CategoryCheckboxes, DocumentsSection, FaqSection } from '@/components/dashboard';
import { Button, Input, TextArea, Title, toast } from '@/components/ui';
import { useMutation, useQuery, useApolloClient } from '@apollo/client/react';
import {
  EDIT_BUSINESS,
  GET_BUSINESS,
  GET_BUSINESS_DEPLOY_INFO,
  REJECT_BUSINESS_APPROVAL_SIGNATURES,
  REQUEST_BUSINESS_APPROVAL_SIGNATURES,
} from '@/lib/business/operations';
import { GET_SIGNATURE_TASK } from '@/lib/pool/operations';
import { ERC20_APPROVE_ABI, FACTORY_ABI, FACTORY_ADDRESS, HOLD_TOKEN_ADDRESS } from '@/lib/contracts';
import { GET_COMPANY } from '@/lib/company/operations';
import { NewsList } from '@/components/news';
import { Modal } from '@/components/common';
import { PoolsSection } from '@/components/pool';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { useAuth } from '@/lib/auth/AuthContext';

// Fee validated against backend test: tests/rwa_fast_tests/business-deployment.test.ts uses '100'
const CREATE_RWA_FEE = '100';

type DeployStatus =
  | 'idle'
  | 'requesting-signatures'
  | 'waiting-signatures'
  | 'approving-hold'
  | 'sending-tx'
  | 'waiting-confirmation';

const DEPLOY_STATUS_LABELS: Record<DeployStatus, string> = {
  idle: '',
  'requesting-signatures': 'Requesting approval signatures…',
  'waiting-signatures': 'Waiting for backend signatures…',
  'approving-hold': 'Approving HOLD token spend…',
  'sending-tx': 'Sending transaction…',
  'waiting-confirmation': 'Waiting for confirmation…',
};

const ProjectPage: FC = () => {
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [aboutValue, setAboutValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState({ name: '', about: '' });

  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle');
  const [deployTxHash, setDeployTxHash] = useState<`0x${string}` | undefined>();
  const deployingRef = useRef(false);

  const params = useParams();
  const projectId = params.projectId as string;

  const { address: walletAddress } = useAccount();
  const { user } = useAuth();
  const apolloClient = useApolloClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const { data: businessData } = useQuery(GET_BUSINESS, {
    variables: { id: projectId },
    skip: !projectId,
  });

  const companyId = businessData?.getBusiness.ownerId as string;

  const { data: companyData } = useQuery(GET_COMPANY, {
    variables: { id: companyId },
    skip: !companyId,
  });

  const { data: deployInfoData, refetch: refetchDeployInfo } = useQuery(GET_BUSINESS_DEPLOY_INFO, {
    variables: { id: projectId },
    skip: !projectId,
  });

  const [editBusiness, { data: updatedBusiness, loading: updatingBusiness }] = useMutation(EDIT_BUSINESS);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [requestBusinessApprovalSignatures] = useMutation<any>(REQUEST_BUSINESS_APPROVAL_SIGNATURES);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rejectBusinessApprovalSignatures] = useMutation<any>(REJECT_BUSINESS_APPROVAL_SIGNATURES);

  const { isSuccess: txConfirmed } = useWaitForTransactionReceipt({ hash: deployTxHash });

  const company = companyData?.getCompany;
  const project = businessData?.getBusiness;

  const canEdit = user != null && company != null && (
    company.ownerId === user.userId ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (company.users as any[])?.some((u: any) => u.userId === user.userId)
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deployInfo = (deployInfoData as any)?.getBusiness;

  useEffect(() => {
    if (txConfirmed && deployStatus === 'waiting-confirmation') {
      setDeployStatus('idle');
      setDeployTxHash(undefined);
      deployingRef.current = false;
      refetchDeployInfo();
      toast('Project successfully deployed!');
    }
  }, [txConfirmed, deployStatus, refetchDeployInfo]);

  const pollUntilComplete = async (taskId: string, timeoutMs = 300_000) => {
    const deadline = Date.now() + timeoutMs;
    let attempt = 0;
    while (Date.now() < deadline) {
      if (attempt > 0) await new Promise(r => setTimeout(r, 3000));
      attempt++;
      try {
        const { data } = await apolloClient.query({
          query: GET_SIGNATURE_TASK,
          variables: { input: { taskId } },
          fetchPolicy: 'network-only',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const task = (data as any)?.getSignatureTask;
        if (task?.completed) {
          return task as { signatures: { signer: string; signature: string }[]; expired: number };
        }
      } catch {
        // Network hiccup — keep polling
      }
    }
    throw new Error('Signature task timed out after 5 minutes. The backend signers may be unavailable.');
  };

  const handleDeploy = async () => {
    if (deployingRef.current) return;
    if (!walletAddress) {
      toast('Connect your wallet first', 'error');
      return;
    }
    if (!project) return;

    deployingRef.current = true;
    try {
      let taskId: string;
      const existingTaskId: string | undefined = deployInfo?.approvalSignaturesTaskId;
      const existingExpiredAt: number | undefined = deployInfo?.approvalSignaturesTaskExpired;
      const now = Math.floor(Date.now() / 1000);

      if (existingTaskId && existingExpiredAt && existingExpiredAt > now) {
        // Active non-expired task exists — reuse it directly
        taskId = existingTaskId;
      } else {
        setDeployStatus('requesting-signatures');

        // If task is expired, reject it first to clear the lock
        if (existingTaskId) {
          try {
            await rejectBusinessApprovalSignatures({ variables: { id: projectId } });
            await refetchDeployInfo();
          } catch {
            // Ignore errors — may already be cleared or rejection not yet allowed
          }
        }

        const sigRes = await requestBusinessApprovalSignatures({
          variables: {
            input: {
              id: projectId,
              ownerWallet: walletAddress,
              deployerWallet: walletAddress,
              createRWAFee: CREATE_RWA_FEE,
            },
          },
        });

        if (sigRes.error) {
          if (existingExpiredAt && existingExpiredAt + 60 > now) {
            const waitUntil = new Date((existingExpiredAt + 60) * 1000).toLocaleTimeString();
            throw new Error(`Previous signature request not yet expired. Try again after ${waitUntil}.`);
          }
          throw new Error(sigRes.error.message);
        }

        taskId = sigRes.data?.requestBusinessApprovalSignatures?.taskId;
        if (!taskId) throw new Error('No taskId returned');
      }

      setDeployStatus('waiting-signatures');
      const task = await pollUntilComplete(taskId);

      const signers = task.signatures.map((s: { signer: string }) => s.signer as `0x${string}`);
      const signatures = task.signatures.map((s: { signature: string }) => s.signature as `0x${string}`);

      const ownerId = deployInfo?.ownerId ?? project.ownerId;
      const ownerType = deployInfo?.ownerType ?? project.ownerType;

      // Approve factory to spend HOLD tokens (contract charges CREATE_RWA_FEE × 10^18)
      setDeployStatus('approving-hold');
      const approveTxHash = await writeContractAsync({
        address: HOLD_TOKEN_ADDRESS,
        abi: ERC20_APPROVE_ABI,
        functionName: 'approve',
        args: [FACTORY_ADDRESS, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')],
      });
      if (!publicClient) throw new Error('No public client available');
      await publicClient.waitForTransactionReceipt({ hash: approveTxHash });

      setDeployStatus('sending-tx');
      const txHash = await writeContractAsync({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        functionName: 'deployRWA',
        args: [
          BigInt(CREATE_RWA_FEE),
          projectId,
          ownerId,
          ownerType,
          walletAddress,
          signers,
          signatures,
          BigInt(Math.floor(task.expired)),
        ],
        gas: BigInt(1_200_000),
      });

      setDeployTxHash(txHash);
      setDeployStatus('waiting-confirmation');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Deploy failed';
      toast(message, 'error');
      setDeployStatus('idle');
      deployingRef.current = false;
    }
  };

  const validateName = (value?: string) => (value ?? nameValue).length > 2;
  const validateAbout = (value?: string) => (value ?? aboutValue).length > 2;

  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = evt => {
    if (validateName(evt.target.value)) setErrors(prev => ({ ...prev, name: '' }));
    setNameValue(evt.target.value);
  };

  const aboutChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = evt => {
    if (validateAbout(evt.target.value)) setErrors(prev => ({ ...prev, about: '' }));
    setAboutValue(evt.target.value);
  };

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    const currentErrors = { ...errors };
    const isNameValid = validateName();
    const isAboutValid = validateAbout();

    if (!isNameValid) currentErrors.name = 'Enter project name';
    if (!isAboutValid) currentErrors.about = 'Enter description';

    setErrors(currentErrors);
    if (!isNameValid || !isAboutValid) return;

    try {
      await editBusiness({
        variables: {
          input: {
            id: projectId,
            updateData: {
              name: nameValue,
              description: aboutValue,
              tags: selectedCategories,
            },
          },
        },
      });

      setIsEditModalOpened(false);
      toast('Project successfully updated!');
    } catch {
      toast('Failed to update project. Please try again.', 'error');
    }
  };

  useEffect(() => {
    if (!project) return;
    setNameValue(project.name);
    setAboutValue(project.description ?? '');
    setSelectedCategories(project.tags ?? []);
  }, [project]);

  const isDeploying = deployStatus !== 'idle';
  const isDeployed = !!deployInfo?.tokenAddress;

  return (
    <DashboardLayout>
      <section className={'mb-12'}>
        <Wrapper>
          <Breadcrumbs
            items={[
              { name: 'My companies', url: '/dashboard/' },
              { name: company?.name ?? '...', url: `/company/${companyId}` },
            ]}
            currentItem={updatedBusiness?.editBusiness.name ?? project?.name ?? '...'}
          />
          {project && (
            <div className={'flex flex-col gap-6 border-b-1 border-stroke-primary pb-6 lg:grid lg:grid-cols-2'}>
              <div>
                <div className={'flex items-center gap-3 mb-4'}>
                  <Title size={'xs'}>{updatedBusiness?.editBusiness.name ?? project.name}</Title>
                  {isDeployed && (
                    <span
                      className={'text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 shrink-0'}
                    >
                      Deployed
                    </span>
                  )}
                </div>
                <div className={'text-base text-black max-w-[560px]'}>
                  {updatedBusiness?.editBusiness.description ?? project.description}
                </div>
              </div>
              <div className={'flex flex-wrap gap-2 lg:items-end lg:justify-end'}>
                {!isDeployed && canEdit && (
                  <div className={'flex items-center gap-3'}>
                    <Button visualType={'quaternary'} disabled={isDeploying} onClick={handleDeploy}>
                      {isDeploying ? 'Deploying…' : 'Deploy project'}
                    </Button>
                    {isDeploying && (
                      <span className={'text-sm text-label-tertiary'}>{DEPLOY_STATUS_LABELS[deployStatus]}</span>
                    )}
                  </div>
                )}
                {canEdit && (
                  <Button
                    className={
                      'max-md:w-full before:size-3.5 before:mask-[url(/icons/edit.svg)] mask-contain before:bg-current'
                    }
                    visualType={'quinary'}
                    onClick={() => setIsEditModalOpened(true)}
                  >
                    Update
                  </Button>
                )}
                <Button
                  className={
                    'max-md:w-full before:size-3.5 before:mask-[url(/icons/share.svg)] mask-contain before:bg-current'
                  }
                  visualType={'quinary'}
                >
                  Share
                </Button>
              </div>
            </div>
          )}
        </Wrapper>
      </section>

      <section className={'mb-12'}>
        <Wrapper>
          <PoolsSection projectId={projectId} />
        </Wrapper>
      </section>

      <section className={'mb-12'}>
        <Wrapper>
          <NewsList projectId={projectId} companyId={companyId} projectName={project?.name} canEdit={canEdit} />
        </Wrapper>
      </section>

      <section className={'mb-12'}>
        <Wrapper>
          <DocumentsSection projectId={projectId} companyId={companyId} canEdit={canEdit} />
        </Wrapper>
      </section>

      <section className={'mb-12'}>
        <Wrapper>
          <FaqSection projectId={projectId} canEdit={canEdit} />
        </Wrapper>
      </section>

      <Modal isOpened={isEditModalOpened} closeModal={() => setIsEditModalOpened(false)}>
        <div className={'text-base font-medium pr-14 pb-4.5 pl-4 border-b-1 border-stroke-primary mb-6'}>
          Edit project
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className={'px-4 mb-6'}>
            <div className={'text-sm font-medium mb-3'}>
              Project name<span className={'text-red-bright'}>*</span>
            </div>
            <Input
              placeholder={'For example, «Green Fund Series A»'}
              size={'sm'}
              colorScheme={'light'}
              errorMessage={errors.name}
              type={'text'}
              name={'projectName'}
              value={nameValue}
              onChange={nameChangeHandler}
            />
          </div>
          <div className={'px-4 mb-6'}>
            <div className={'text-sm font-medium mb-3'}>
              Description<span className={'text-red-bright'}>*</span>
            </div>
            <TextArea
              className={'h-[110px]'}
              maxLength={250}
              errorMessage={errors.about}
              placeholder={'Write a short description for your project'}
              name={'projectAbout'}
              value={aboutValue}
              onChange={aboutChangeHandler}
            />
          </div>
          <div className={'px-4 mb-6'}>
            <CategoryCheckboxes selected={selectedCategories} onChange={setSelectedCategories} />
          </div>
          <div className={'px-4 flex justify-end'}>
            <Button visualType={'quaternary'} type={'submit'} disabled={updatingBusiness}>
              Apply
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default ProjectPage;
