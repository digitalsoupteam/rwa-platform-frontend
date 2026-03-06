import React, { FC } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

function getPaginationPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = getPaginationPages(page, totalPages);

  return (
    <div className={'flex items-center gap-1'}>
      {page > 1 && (
        <button
          type={'button'}
          onClick={() => onPageChange(page - 1)}
          className={
            'cursor-pointer flex items-center gap-1 mr-1 px-3 h-8 rounded-lg border border-stroke-primary text-sm font-medium text-label-secondary hover:bg-gray-50 transition-colors'
          }
        >
          <Icon name={'tick'} className={'size-3.5 rotate-180'} /> Prev
        </button>
      )}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className={'w-8 text-center text-sm text-label-tertiary select-none'}>
            ...
          </span>
        ) : (
          <button
            key={p}
            type={'button'}
            onClick={() => onPageChange(p as number)}
            className={clsx(
              'cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors',
              page === p ? 'bg-bg-tertiary' : 'text-grey-dark'
            )}
          >
            {p}
          </button>
        )
      )}
      {page < totalPages && (
        <button
          type={'button'}
          onClick={() => onPageChange(page + 1)}
          className={
            'cursor-pointer flex items-center gap-1 ml-1 px-3 h-8 rounded-lg border border-stroke-primary text-sm font-medium text-label-secondary hover:bg-gray-50 transition-colors'
          }
        >
          Next <Icon name={'tick'} className={'size-3.5'} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
