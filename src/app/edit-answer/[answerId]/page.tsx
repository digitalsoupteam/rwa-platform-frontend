'use client';

import React, { FC, FormEventHandler, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Button, Title, toast } from '@/components/ui';
import { ConfirmModal } from '@/components/common';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_COMPANY } from '@/lib/company/operations';
import { GET_BUSINESS } from '@/lib/business/operations';
import { DELETE_FAQ_ANSWER, GET_FAQ_ANSWER, UPDATE_FAQ_ANSWER } from '@/lib/faq/operations';
import { FaqEditor, FaqEditorHandle } from '@/components/faq';

const EditAnswerPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const companyId = params.id as string;
  const projectId = params.projectId as string;
  const answerId = params.answerId as string;

  const editorRef = useRef<FaqEditorHandle>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: companyData } = useQuery(GET_COMPANY, { variables: { id: companyId }, skip: !companyId });
  const { data: businessData } = useQuery(GET_BUSINESS, { variables: { id: projectId }, skip: !projectId });
  const { data: answerData, loading: answerLoading } = useQuery(GET_FAQ_ANSWER, {
    variables: { id: answerId },
    skip: !answerId,
  });

  const [updateAnswer, { loading: updatingAnswer }] = useMutation(UPDATE_FAQ_ANSWER);
  const [deleteAnswer, { loading: deletingAnswer }] = useMutation(DELETE_FAQ_ANSWER);

  const company = companyData?.getCompany;
  const project = businessData?.getBusiness;
  const answer = answerData?.getFaqAnswer;

  const submitHandler: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    const data = editorRef.current?.getData();
    if (!data) return;

    try {
      await updateAnswer({
        variables: { input: { id: answerId, updateData: { question: data.question, answer: data.answer } } },
      });
      toast('Answer updated!');
      router.push(`/my-companies/${companyId}/projects/${projectId}`);
    } catch {
      toast('Failed to update answer.', 'error');
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteAnswer({ variables: { id: answerId } });
      toast('Answer deleted.');
      router.push(`/my-companies/${companyId}/projects/${projectId}`);
    } catch {
      toast('Failed to delete answer.', 'error');
    }
  };

  if (answerLoading || !answer) return null;

  return (
    <DashboardLayout>
      <form onSubmit={submitHandler}>
        <section className={'mb-12'}>
          <Wrapper>
            {company?.name && project?.name && (
              <Breadcrumbs
                items={[
                  { name: 'My companies', url: '/dashboard/' },
                  { name: company.name, url: `/my-companies/${companyId}` },
                  { name: project.name, url: `/my-companies/${companyId}/projects/${projectId}` },
                ]}
                currentItem={'Edit answer'}
              />
            )}
            <div className={'border-b-1 border-stroke-primary pb-6 flex justify-between'}>
              <Title size={'xs'}>Edit answer</Title>
              <div className={'flex items-center gap-3'}>
                <Button
                  visualType={'quinary'}
                  type={'button'}
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete
                </Button>
                <Button
                  visualType={'quinary'}
                  type={'button'}
                  onClick={() => router.push(`/my-companies/${companyId}/projects/${projectId}`)}
                >
                  Cancel
                </Button>
                <Button visualType={'quaternary'} type={'submit'} disabled={updatingAnswer}>
                  Update
                </Button>
              </div>
            </div>
          </Wrapper>
        </section>

        <section>
          <Wrapper>
            <FaqEditor
              ref={editorRef}
              initialQuestion={answer.question}
              initialAnswer={answer.answer}
            />
          </Wrapper>
        </section>
      </form>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title={'Delete answer'}
        description={'This action cannot be undone.'}
        loading={deletingAnswer}
        onConfirm={deleteHandler}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default EditAnswerPage;
