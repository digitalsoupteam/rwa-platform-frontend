import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  project: {
    id: string;
    name: string;
    description?: string | null;
    tags?: string[] | null;
    riskScore?: number | null;
    poolsCount?: number;
    rewardPercent?: string | null;
  };
}

const ProjectCard: FC<ProjectCardProps> = ({ className, project }) => {
  const { name, description, tags, riskScore, poolsCount, rewardPercent } = project;

  return (
    <div className={clsx('bg-white border-1 border-stroke-primary rounded-xl flex flex-col gap-4', className)}>
      {/* GROWTH badge — hidden until data is available */}
      {/*<div className={'flex items-center justify-between'}>*/}
      {/*  <span />*/}
      {/*  <span className={'text-xs font-medium tracking-widest text-label-tertiary'}>GROWTH</span>*/}
      {/*</div>*/}

      <div className={'p-4'}>
        <div className={'text-xl font-bold mb-3'}>{name}</div>
        {description && <div className={'text-base line-clamp-2'}>{description}</div>}
      </div>

      <div className={'bg-bg-tertiary p-4 flex flex-col gap-4'}>
        {tags && tags.length > 0 && (
          <div className={'flex flex-wrap gap-2'}>
            {tags.map(tag => (
              <span key={tag} className={'text-base/[100%] text-blue font-medium bg-[#D9E4FF] rounded-full px-3 py-2'}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={'grid grid-cols-3 gap-2'}>
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
