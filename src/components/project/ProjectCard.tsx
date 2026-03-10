import React, { FC, HTMLAttributes } from 'react';
import { Card } from '@/components/ui';
import Image from 'next/image';

interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  project: {
    id: string;
    name: string;
    logo: string;
    network: string;
    relativeProfitUSDT: number;
    profit: number;
    pool: {
      current: number;
      target: number;
      dueDate: string;
    }
  }
}

const ProjectCard: FC<ProjectCardProps> = ({ className, project }) => {
  return (
    <Card className={className} size={'sm'} color={'greyLight'} key={project.id + 'promising-project'}>
      <div className={'grid grid-cols-[max-content_1fr_max-content] items-center mb-7'}>
        <Image
          className={'size-11 object-cover object-center rounded-full mr-3'}
          src={project.logo}
          width={'44'}
          height={'43'}
          alt={' '}
        />
        <div className={'text-black text-base[1.4] truncate mr-6'}>{project.name}</div>
        <div className={'ml-auto py-1 px-2.5 rounded-[20px] bg-blue-dim text-base[1.2] font-semibold text-blue'}>
          {project.network}
        </div>
      </div>
      <div className={'pb-6 border-b border-grey/40 mb-5'}>
        <div className={'text-grey-dark text-base/[1.4] mb-4'}>
          <span className={'text-black text-2xl/[1.2] font-bold'}>{project.relativeProfitUSDT} USDT</span> / 1{' '}
          {project.network}
        </div>
        <div className={'py-1.5 px-3 rounded-[20px] bg-blue-dim w-fit'}>~{project.profit}% monthly profit</div>
      </div>
      <div className={'text-sm/[1.4] text-grey-dark'}>
        <div className={'mb-2'}>Pool collecting status</div>
        <div className={'relative overflow-hidden rounded-lg bg-blue-dim h-8 flex items-center justify-center mb-2'}>
          <div
            className={'z-0 absolute top-0 left-0 bottom-0 right-0 bg-blue-accent'}
            style={{ width: `${(project.pool.current / project.pool.target) * 100}%` }}
          />
          <div className={'z-1 relative text-black text-sm/[1.4] font-bold'}>
            {project.pool.current} / {project.pool.target}
          </div>
        </div>
        <div>{project.pool.dueDate}</div>
      </div>
    </Card>
  );
};

export default ProjectCard;
