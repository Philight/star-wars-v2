import Icon from '@components/graphic/Icon';
import Shape from '@components/graphic/Shape';

export const CardsPagination = props => {
  const { className, showResults, currentPage, setCurrentPage, cardsArrLength } = props;

  const handlePagination = MODE => () => {
    if (MODE === 'PREV' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    } else if (MODE === 'NEXT' && currentPage < cardsArrLength) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const calculateTranslate = () => {
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
      className={`
			cards-pagination__c flex-center-v ${className} 
			${showResults ? 'show-results' : ''}
		`}
    >
      <div
        className={`cards-pagination__control flex-center arrow prev ${
          currentPage === 1 && 'disabled'
        } `}
        onClick={handlePagination('PREV')}
      >
        <Icon icon="chevron-left" className={``} />
        <Shape className={`polygon`} />
      </div>

      <div className={`cards-pagination__control__indexes flex-center-v`}>
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
            <>
              {pageIndex === cardsArrLength && (
                <span
                  className={`cards-pagination__control index placeholder ${
                    currentPage <= cardsArrLength - 3 && 'visible'
                  } flex-center`}
                >
                  ...
                </span>
              )}

              <span
                className={`cards-pagination__control  index flex-center
								${currentPage === pageIndex && 'selected'} ${paginationConditions && 'visible'}
							`}
              >
                {pageIndex}
                <Shape className={`polygon`} />
              </span>

              {pageIndex === 1 && (
                <span
                  className={`cards-pagination__control index placeholder ${
                    currentPage >= 4 && 'visible'
                  } flex-center`}
                >
                  ...
                </span>
              )}
            </>
          );
        })}
      </div>

      <div
        className={`cards-pagination__control flex-center arrow next ${
          currentPage === cardsArrLength && 'disabled'
        }`}
        onClick={handlePagination('NEXT')}
      >
        <Icon icon="chevron-left" />
        <Shape className={`polygon`} />
      </div>
    </div>
  );
};
