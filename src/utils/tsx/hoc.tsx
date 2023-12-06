import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

interface IPageData {
  img: string;
  page: string;
}

export const withPageData =
  (Component: React.FC, { img, page }: IPageData) =>
  (props: { [key: string]: unknown }): JSX.Element | React.FC | null => {
    // @ts-ignore
    const { setPageData } = useOutletContext();

    useEffect(() => {
      setPageData({ img, page });
    }, [setPageData]);

    return <Component {...props} />;
  };
