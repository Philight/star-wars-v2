import React from 'react';

export const usePrevious = (value: unknown): unknown => {
  const ref = React.useRef<unknown>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export interface IPageData {
  img: string;
  page: string;
}

export const usePageData = (): { pageData: IPageData; setPageData: unknown } => {
  const [state, setState] = React.useState<IPageData>({ img: '', page: '' });
  // eslint-disable-next-line no-shadow
  const setPageData = React.useCallback(({ img, page }: IPageData) => setState({ img, page }), []);

  return {
    pageData: state,
    setPageData,
  };
};