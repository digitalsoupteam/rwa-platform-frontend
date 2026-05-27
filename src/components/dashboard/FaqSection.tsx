'use client';

import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, ButtonBorderDash, Icon, Title } from '@/components/ui';
import { useQuery } from '@apollo/client/react';
import { GET_FAQ_ANSWERS, GET_FAQ_TOPICS } from '@/lib/faq/operations';

interface FaqSectionProps {
  projectId: string;
  canEdit?: boolean;
}

const FaqSection: FC<FaqSectionProps> = ({ projectId, canEdit = false }) => {
  const router = useRouter();
  const params = useParams();
  const companyId = params.id as string;

  const { data: topicsData } = useQuery(GET_FAQ_TOPICS, {
    variables: { input: { filter: { parentId: projectId } } },
  });

  const topic = topicsData?.getFaqTopics[0];

  const { data: answersData } = useQuery(GET_FAQ_ANSWERS, {
    variables: { input: { filter: { topicId: topic?.id } } },
    skip: !topic?.id,
  });

  const answers = answersData?.getFaqAnswers ?? [];

  const navigateToCreate = () => {
    router.push(`/my-companies/${companyId}/projects/${projectId}/create-answer`);
  };

  const navigateToEdit = (answerId: string) => {
    router.push(`/my-companies/${companyId}/projects/${projectId}/edit-answer/${answerId}`);
  };

  if (answers.length === 0 && !canEdit) return null;

  return (
    <>
      <div className={'flex items-center justify-between mb-6'}>
        <Title size={'xs'} level={2}>
          FAQs
        </Title>
        {answers.length > 0 && canEdit && (
          <Button visualType={'quaternary'} onClick={navigateToCreate}>
            <Icon name={'plus'} />
            Add answer
          </Button>
        )}
      </div>

      {answers.length === 0 && canEdit && (
        <ButtonBorderDash className={'min-h-42.5'} onClick={navigateToCreate}>
          Add answer
        </ButtonBorderDash>
      )}

      {answers.length > 0 && (
        <div className={'flex flex-col gap-3'}>
          {answers.map(answer => (
            <div
              key={answer.id}
              className={'flex items-start justify-between gap-4 py-4.5 px-5 border-1 border-stroke-primary rounded-xl'}
            >
              <div className={'flex-1 min-w-0'}>
                <div className={'text-base font-semibold mb-1'}>{answer.question}</div>
                <p className={'text-sm text-label-secondary line-clamp-2'}>{answer.answer}</p>
              </div>
              {canEdit && (
                <div className={'shrink-0'}>
                  <Button visualType={'quinary'} type={'button'} onClick={() => navigateToEdit(answer.id)}>
                    <Icon name={'edit'} className={'size-3.5'} />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FaqSection;
