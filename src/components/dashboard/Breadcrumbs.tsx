import React, { FC } from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  items: {
    name: string;
    url: string;
  }[];
  currentItem: string;
}

const Breadcrumbs: FC<BreadcrumbItem> = ({ items, currentItem }) => {
  return (
    <div className={'text-base text-base mb-6'}>
      {items.map((item, index) => (
        <React.Fragment key={'bcItem' + item.name}>
          {index !== 0 && <span> / </span>}
          <Link href={item.url}>{item.name}</Link>
        </React.Fragment>
      ))}
      <span className={'text-label-tertiary'}>
        <span> / </span>
        {currentItem}
      </span>
    </div>
  );
};

export default Breadcrumbs;
