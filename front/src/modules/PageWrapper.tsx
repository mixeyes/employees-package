import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

interface IPageWrapper {
  children: ReactNode;
  description: string;
  title: string;
}
export const PageWrapper: FC<IPageWrapper> = ({ children, description, title }) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const metadata: Metadata = {
    description,
    title,
  };

  return <div>{children}</div>;
};
