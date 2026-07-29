import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { CountryChip } from '@/components/common';

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  project: {
    id: string;
    name: string;
    description?: string | null;
    tags?: string[] | null;
    riskScore?: number | null;
    poolsCount?: number;
    rewardPercent?: string | null;
    country?: string | null;
    businessType?: string | null;
  };
}

const ProjectCard: FC<ProjectCardProps> = ({ className, project }) => {
  const { name, description, tags, riskScore, poolsCount, rewardPercent, country, businessType } = project;

  return (
    <div className={clsx('bg-white border-1 border-stroke-primary rounded-xl overflow-hidden flex flex-col gap-6 pt-4', className)}>
      {(country || businessType) && (
        <div className={'flex items-center justify-between gap-2 px-4'}>
          <CountryChip code={country} />
          {businessType && (
            <span className={'text-base text-grey-dark text-right uppercase shrink-0'}>{businessType}</span>
          )}
        </div>
      )}

      <div className={'px-4 flex flex-col gap-3'}>
        <div className={'text-xl font-semibold'}>{name}</div>
        {description && <div className={'text-base line-clamp-2'}>{description}</div>}
      </div>

      <div className={'bg-bg-tertiary py-4 flex flex-col gap-4'}>
        {tags && tags.length > 0 && (
          <div className={'flex flex-wrap gap-2 px-4'}>
            {tags.map(tag => (
              <span key={tag} className={'text-base/[100%] text-blue font-medium bg-[#D9E4FF] rounded-full px-3 py-2'}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={'grid grid-cols-3 gap-2 px-4'}>
          <div className={'rounded-sm border-1 border-stroke-primary px-2 pt-2 pb-4'}>
            <div className={'text-sm text-grey-dark mb-2'}>Current pools</div>
            <div className={'text-lg font-semibold'}>{poolsCount ?? 0}</div>
          </div>
          <div className={'rounded-sm border-1 border-stroke-primary px-2 pt-2 pb-4'}>
            <div className={'text-sm text-grey-dark mb-2'}>Avg monthly profit</div>
            <div className={'text-lg font-semibold'}>{rewardPercent ? `~${rewardPercent}%` : '—'}</div>
          </div>
          <div className={'rounded-sm border-1 border-stroke-primary px-2 pt-2 pb-4'}>
            <div className={'text-sm text-grey-dark mb-2'}>AI Risk Score</div>
            <div className={'text-lg font-semibold'}>{riskScore ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
