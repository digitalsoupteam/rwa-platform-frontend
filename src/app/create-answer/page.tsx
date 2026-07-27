'use client';

import React, { FC, FormEventHandler, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout, Wrapper } from '@/components/layout';
import { Breadcrumbs } from '@/components/dashboard';
import { Button, Title, toast } from '@/components/ui';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_FAQ_ANSWER, CREATE_FAQ_TOPIC, GET_FAQ_TOPICS } from '@/lib/faq/operations';
import { GET_BUSINESS } from '@/lib/business/operations';
import { GET_COMPANY } from '@/lib/company/operations';
import { FaqParentTypes } from '@/gql/graphql';
import { FaqEditor, FaqEditorHandle } from '@/components/faq';

const CreateAnswerPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const companyId = params.id as string;
  const projectId = params.projectId as string;

  const editorRef = useRef<FaqEditorHandle>(null);

  const { data: companyData } = useQuery(GET_COMPANY, { variables: { id: companyId }, skip: !companyId });
  const { data: businessData } = useQuery(GET_BUSINESS, { variables: { id: projectId }, skip: !projectId });
  const { data: topicsData, refetch: refetchTopics } = useQuery(GET_FAQ_TOPICS, {
    variables: { input: { filter: { parentId: projectId } } },
  });

  const [createTopic] = useMutation(CREATE_FAQ_TOPIC);
  const [createAnswer, { loading: creatingAnswer }] = useMutation(CREATE_FAQ_ANSWER);

  const company = companyData?.getCompany;
  const project = businessData?.getBusiness;
  const topic = topicsData?.getFaqTopics[0];

  const ensureTopic = async (): Promise<string> => {
    if (topic?.id) return topic.id;
    const result = await createTopic({
      variables: {
        input: { name: project?.name ?? 'FAQ', parentId: projectId, type: FaqParentTypes.Business },
      },
    });
    await refetchTopics();
    return result.data!.createFaqTopic.id;
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    const data = editorRef.current?.getData();
    if (!data) return;

    try {
      const topicId = await ensureTopic();
      await createAnswer({
        variables: { input: { topicId, question: data.question, answer: data.answer } },
      });
      toast('Answer published!');
      router.push(`/my-companies/${companyId}/projects/${projectId}`);
    } catch {
      toast('Failed to publish answer.', 'error');
    }
  };

  return (
    <DashboardLayout>
      <form onSubmit={submitHandler}>
        <section className={'mb-12'}>
          <Wrapper>
            {company?.name && project?.name && (
              <Breadcrumbs
                items={[
                  { name: company.name, url: `/my-companies/${companyId}` },
                  { name: project.name, url: `/my-companies/${companyId}/projects/${projectId}` },
                ]}
                currentItem={'Add answer'}
              />
            )}
            <div className={'border-b-1 border-stroke-primary pb-6 flex justify-between'}>
              <Title size={'xs'}>Add answer</Title>
              <div className={'flex items-center gap-3'}>
                <Button
                  visualType={'quinary'}
                  type={'button'}
                  onClick={() => router.push(`/my-companies/${companyId}/projects/${projectId}`)}
                >
                  Cancel
                </Button>
                <Button visualType={'quaternary'} type={'submit'} disabled={creatingAnswer}>
                  Publish
                </Button>
              </div>
            </div>
          </Wrapper>
        </section>

        <section>
          <Wrapper>
            <FaqEditor ref={editorRef} />
          </Wrapper>
        </section>
      </form>
    </DashboardLayout>
  );
};

export default CreateAnswerPage;
