import React from 'react';
import { Icon, Shape } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';

const PaginationArrow = ({ className, onClick, direction }): IGenericComponent => {
  const isNext = direction === 'NEXT' ? true : false;

  return (
    <div
      className={[
        `cards-pagination__control f-center arrow`,
        isNext ? 'next' : 'prev',
        className,
      ].css()}
      onClick={onClick}
    >
      <Icon icon={`chevron-${isNext ? 'right' : 'left'}`} />
      <Shape className={`polygon`} />
    </div>
  );
};

interface IComponentProps extends IGenericProps {}

export const CardsPagination = (props: IComponentProps): IGenericComponent => {
  const { className, showResults, currentPage, setCurrentPage, cardsArrLength } = props;

  const handlePagination = (MODE: string) => (): void => {
    if (MODE === 'PREV' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (MODE === 'NEXT' && currentPage < cardsArrLength) {
      setCurrentPage(currentPage + 1);
    }
  };

  const calculateTranslate = (): string => {
    let multiplier = 0;

    if (currentPage === 1) {
      // currentPage-1
      multiplier = 0;
    } else if ([2, 3].includes(currentPage)) {
      multiplier = 1;
    } else if (currentPage === cardsArrLength - 2) {
      // 11 => 2 // 12 => 3 // 13 => 4
      multiplier = 2;
    } else if (currentPage === cardsArrLength) {
      // 11 => 2 // 12 => 3 // 13 => 4
      multiplier = 4;
    } else if (currentPage === cardsArrLength - 1 || currentPage >= 4) {
      // currentPage-1(-i)
      multiplier = 3;
    }

    return `translateX(${multiplier * 100}%)`;
  };

  return (
    <div
      className={[
        `cards-pagination__c f-center-y`,
        className,
        showResults ? 'show-results' : '',
      ].css()}
    >
      <PaginationArrow
        className={[currentPage === 1 && 'disabled'].css()}
        direction="PREV"
        onClick={handlePagination('PREV')}
      />

      <div className={`cards-pagination__control__indexes f-center-y`}>
        <span
          className={`cards-pagination__control selection`}
          style={{ transform: calculateTranslate() }}
        />
        {Array.from({ length: cardsArrLength }, (_, i) => i + 1).map(pageIndex => {
          const paginationConditions =
            cardsArrLength === pageIndex ||
            (cardsArrLength === currentPage && pageIndex === currentPage - 2) ||
            (currentPage === 1 && pageIndex === currentPage + 2) ||
            (currentPage > 3 && pageIndex === 1) ||
            ([pageIndex - 1, pageIndex, pageIndex + 1].includes(currentPage) &&
              (currentPage === cardsArrLength - 2 ? pageIndex !== currentPage - 1 : true));
          return (
            <React.Fragment key={pageIndex}>
              {pageIndex === cardsArrLength && (
                <span
                  className={[
                    `cards-pagination__control index placeholder f-center`,
                    currentPage <= cardsArrLength - 3 && 'visible',
                  ].css()}
                >
                  ...
                </span>
              )}

              <span
                className={[
                  `cards-pagination__control index f-center`,
                  currentPage === pageIndex && 'selected',
                  paginationConditions && 'visible',
                ].css()}
              >
                {pageIndex}
                <Shape className={`polygon`} />
              </span>

              {pageIndex === 1 && (
                <span
                  className={[
                    `cards-pagination__control index placeholder f-center`,
                    currentPage >= 4 && 'visible',
                  ].css()}
                >
                  ...
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <PaginationArrow
        className={[currentPage === cardsArrLength && 'disabled'].css()}
        direction="NEXT"
        onClick={handlePagination('NEXT')}
      />
    </div>
  );
};
