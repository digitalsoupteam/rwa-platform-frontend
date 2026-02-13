import React, { FC, PropsWithChildren } from 'react';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={'px-3 mx-auto min-w-[360px] max-w-[1400px] md:px-5'}>{children}</div>;
};

export default Wrapper;
