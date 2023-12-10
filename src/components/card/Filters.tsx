import React, { useState, useEffect, useReducer, useRef, useContext, useMemo } from 'react';

import { useDataContext } from '@contexts/DataContext';
import { Icon, Shape } from '@components/graphic';
// import Background from '@components/layout/Background';

import { RangeFilter, SelectFilter, RadioFilter } from '@components/card';
import { arrayUniqueValues } from '@utils';

const filtersReducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'initialize':
      return action.data;
    case 'reset':
      for (const attribute in newState) {
        if (attribute in newState) {
          for (const value in newState[attribute]) {
            if (value in newState[attribute]) {
              newState[attribute][value].active = true;
            }
          }
        }
      }
      return newState;
    case 'update':
      newState[action.column] = action.data;
      return newState;

    default:
      break;
  }
  return newState;
};

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  data: { [key: string]: unknown };
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Filters = (props: IComponentProps): IGenericComponent => {
  const { className, columns, data, updateFilteredData, activeFilters, updateActiveFilters } =
    props;

  const [isVisible, setIsVisible] = useState(false);

  const context = useDataContext();
  //  const [state, dispatch] = useReducer(filtersReducer, null);
  const avatarsData = context.data?.avatars ?? [];
  const resetFlag = useRef(0);
  const isReset = useRef(false);

  // Get initial Filters from fetched data
  const getInitialFilters = (): { [key: string]: string[] | number[] } => {
    const initialFilters = {};

    if (!avatarsData.length) return initialFilters;

    for (const col of columns) {
      const columnName = col.name;

      // Set initial values array
      if (!(columnName in initialFilters)) {
        initialFilters[columnName] = [];
      }

      // Get filter values from External instances
      if (['films', 'vehicles', 'starships'].includes(columnName)) {
        const ids = [];
        for (const instance of context.data[columnName]) {
          //          const name = instance?.name || instance?.title;
          const id = instance.url.split(`/${columnName}/`)[1].split('/')[0];
          ids.push(id);
        }
        initialFilters[columnName] = arrayUniqueValues(ids).sortAsc();

      // Get filter values from Character attributes
      } else {
        const values = avatarsData && avatarsData.map(avatar => avatar[columnName]);
        initialFilters[columnName] = arrayUniqueValues(values).sortAsc();
      }
    }

    if (updateActiveFilters) {
      updateActiveFilters(initialFilters);
    }
console.log('Filters | initialFilters', initialFilters);    
    return initialFilters;
  };

  const allFilters = useMemo(() => getInitialFilters(), [avatarsData]);

  const updateFilter = (columnName, updatedValues) => {
    if (updateActiveFilters) {
      const newFilters = {
        ...activeFilters,
        [columnName]: updatedValues,
      };
      updateActiveFilters(newFilters);
    }
  };

  const toggleFilter = () => () => {
    setIsVisible(prevState => !prevState);
  };

  /*
  useEffect(() => {
    const newFilterTree = {};
    for (const col of columns) {
      const columnName = col.name;

      if (!(columnName in newFilterTree)) {
        newFilterTree[columnName] = {};
      }

      if (['films', 'vehicles', 'starships'].includes(columnName)) {
        for (const instance of context.data[columnName]) {
          const name = instance?.name || instance?.title;
          const instanceId = instance.url.split(`/${columnName}/`)[1].split('/')[0];
          if (!(name in newFilterTree[columnName])) {
            newFilterTree[columnName][instanceId] = {
              label: name,
              active: true,
            };
          }
        }
      } else {
        for (const character of data) {
          const value = character[columnName];
          if (!(value in newFilterTree[columnName])) {
            newFilterTree[columnName][value] = {
              label: value,
              active: true,
            };
          }
        }
      }
    }
    dispatch({
      type: 'initialize',
      data: newFilterTree,
    });
    isReset.current = true;
  }, []);


  const toggleFilter = () => () => {
    setIsVisible(prevState => !prevState);
  };

  const updateFilter = (columnName, updatedValues) => {
    dispatch({ type: 'update', column: columnName, data: updatedValues });
    if (isReset.current) {
      isReset.current = false;
    }
  };

  const resetFilter = () => event => {
    event.preventDefault();
    dispatch({ type: 'reset' });
    resetFlag.current = resetFlag.current + 1;
    isReset.current = true;
  };

  const applyFilter = () => event => {
    event.preventDefault();

    const filteredData = data.filter(item => {
      for (const attribute in state) {
        if (attribute in state) {
          const value = item[attribute];
          if (value instanceof Array) {
            for (const url of value) {
              const id = url.split(`/${attribute}/`)[1].split('/')[0];
              if (!state[attribute][id].active) {
                return false;
              }
            }
          } else if (!state[attribute][value].active) {
            return false;
          }
        }
      }
      return true;
    });

    updateFilteredData(filteredData);
    toggleFilter()();
  };
*/
  return (
    <div
      className={`
			filter__c ${className} ${isVisible ? 'visible' : 'hidden'}
		`}
    >
      <Icon className={`filter__toggle`} icon="filter" onClick={toggleFilter()} />

      <dialog className={`filter__modal full-screen`}>
        {/*
        <Background className={`filter__modal-drop-shadow`} />
*/}
        <div className={`filter__modal-content fill-parent`}>
          <div className={`filter__modal-inner fill-parent flex-col`}>
            <div className={`filter__modal-top flex-center-v`}>
              <h4 className={`btn-text-lg`}>Filters</h4>
              <Icon
                className={`filter__modal-close`}
                icon="star-wars-x-mark"
                onClick={toggleFilter()}
              />
            </div>

            <div className={`filter__modal-filters flex-col`}>
              {columns.map(dataColumn => (
                <div
                  key={`${dataColumn.name}-${dataColumn.type}`}
                  className={`filter__modal-filter ${dataColumn.type} flex-col`}
                >
                  <h5 className={`filter__modal-filter-heading btn-text-sm`}>
                    {dataColumn.name.replace('_', ' ')}
                  </h5>

                  {dataColumn.type === 'range' && (
                    <RangeFilter
                      className={`filter__modal-filter--range`}
                      //                      allFilters={allFilters}
                      //                      activeFilters={activeFilters}
                      allValues={allFilters?.[dataColumn.name]}
                      activeValues={activeFilters?.[dataColumn.name]}
                      updateActiveValues={newValues => updateFilter(dataColumn.name, newValues)}
                      //                      resetFlag={resetFlag.current}
                    />
                  )}

                  {/*
                    dataColumn.type === 'range' ? (
                    <RangeFilter
                      className={`filter__modal-filter--slider`}
                      values={!!state && state[dataColumn.name]}
                      updateFilter={updatedValues => updateFilter(dataColumn.name, updatedValues)}
                      resetFlag={resetFlag.current}
                    />
                  ) : dataColumn.type === 'select' ? (
                    <SelectFilter
                      className={`filter__modal-filter--select`}
                      values={!!state && state[dataColumn.name]}
                      updateFilter={updatedValues => updateFilter(dataColumn.name, updatedValues)}
                    />
                  ) : (
                    dataColumn.type === 'radio' && (
                      <RadioFilter
                        className={`filter__modal-filter--radio`}
                        values={!!state && state[dataColumn.name]}
                        updateFilter={updatedValues => updateFilter(dataColumn.name, updatedValues)}
                      />
                    )
                  )
                */}
                </div>
              ))}
            </div>

            <div className={`filter__modal-actions flex-center-v`}>
              <button
                className={`filter__modal-button btn-text-lg flex-center`}
                //                onClick={resetFilter()}
                //                disabled={isReset.current}
              >
                Reset
                <Shape className={`polygon`} />
              </button>
              <button
                className={`filter__modal-button btn-text-lg flex-center`}
                //                onClick={applyFilter()}
              >
                Apply
                <Shape className={`polygon`} />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
