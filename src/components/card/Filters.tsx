import React, { useState, useEffect, useReducer, useRef, useContext, useMemo } from 'react';

import { useDataContext } from '@contexts/DataContext';
import { Icon, Shape } from '@components/graphic';
import { RangeFilter, SelectFilter, RadioFilter } from '@components/card';
// import Background from '@components/layout/Background';
import { filterReducer } from '@data';
import { arrayUniqueValues } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  data: { [key: string]: unknown };
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Filters = (props: IComponentProps): IGenericComponent => {
  const { className, columns, data, updateFilteredData, activeFilters, updateActiveFilters } =
    props;

  const [isVisible, setIsVisible] = useState(false);

  const [state, dispatch] = useReducer(filterReducer, null);

  const context = useDataContext();
  const avatarsData = context.data?.avatars ?? [];
  const resetFlag = useRef(0);
  const isReset = useRef(false);

  const getInitialFilters = (): { [key: string]: unknown } => {
    const newFilterTree = {};

    if (!avatarsData.length) {
      return newFilterTree;
    }

    for (const col of columns) {
      const columnName = col.name;

      // Set initial values array
      if (!(columnName in newFilterTree)) {
        newFilterTree[columnName] = {};
      }

      // Get filter values from External objects
      if (['films', 'vehicles', 'starships'].includes(columnName)) {
        for (const instance of context.data[columnName]) {
          const name = instance?.name || instance?.title;
          const id = instance.url.split(`/${columnName}/`)[1].split('/')[0];
          if (!(name in newFilterTree[columnName])) {
            newFilterTree[columnName][id] = {
              label: name,
              active: true,
            };
          }
        }

        // Get filter values from Character attributes
      } else {
        const values =
          avatarsData && arrayUniqueValues(avatarsData.map(avatar => avatar[columnName])).sortAsc();
        for (const value of values) {
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
      type: 'INITIALIZE',
      payload: {
        data: newFilterTree,
      },
    });
    isReset.current = true;
  };

  const initialFilters = useMemo(() => getInitialFilters(), [avatarsData]);

  /*
  // Get initial Filters from fetched data
  const getInitialFilters = (): { [key: string]: string[] | number[] } => {
    const initialFilters = {};

    if (!avatarsData.length) {
      return initialFilters;
    }

    for (const col of columns) {
      const columnName = col.name;

      // Set initial values array
      if (!(columnName in initialFilters)) {
        initialFilters[columnName] = [];
      }

      // Get filter values from External objects
      if (['films', 'vehicles', 'starships'].includes(columnName)) {
        const ids = [];
        for (const instance of context.data[columnName]) {
          const name = instance?.name || instance?.title;
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

//  const allFilters = useMemo(() => getInitialFilters(), [avatarsData]);

  const updateFilter = (columnName, updatedValues): void => {
    if (updateActiveFilters) {
      const newFilters = {
        ...activeFilters,
        [columnName]: updatedValues.sortAsc(),
      };
      updateActiveFilters(newFilters);
    }
  };
*/

  const updateFilter = (columnName: string, updatedValues: { [key: string]: unknown }): void => {
    dispatch({
      type: 'UPDATE_COLUMN',
      payload: {
        column: columnName,
        data: updatedValues,
      },
    });
    if (isReset.current) {
      isReset.current = false;
    }
  };

  const resetFilter = () => event => {
    event.preventDefault();
    dispatch({
      type: 'RESET',
      payload: {
        data: initialFilters,
      },
    });
    resetFlag.current = resetFlag.current + 1;
    isReset.current = true;
  };

  const toggleFilter = () => () => {
    setIsVisible(prevState => !prevState);
  };

  const applyFilter = () => event => {
    event.preventDefault();
    /*
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
*/
    const updatedFilters = {};
    for (const attribute in state) {
      if (attribute in state) {
        updatedFilters[attribute] = [];
        for (const value in state[attribute]) {
          if (value.active === true) {
            updatedFilters[attribute].push(attribute);
          }
        }
      }
    }

    updateActiveFilters(updatedFilters);
    //    updateFilteredData(filteredData);
    toggleFilter()();
  };

  return (
    <div className={[`filters__c`, isVisible ? 'open' : 'closed', className].css()}>
      <Icon className={`filters__toggle`} icon="filter" onClick={toggleFilter()} />

      <dialog className={`filters__modal full-screen`}>
        {/*
        <Background className={`filter__modal-drop-shadow`} />
*/}
        <div className={`filters__modal-inner fill-parent f-col`}>
          <div className={`filters__modal-header f-center-y`}>
            <h3>Filters</h3>
            <Icon
              className={`filters__modal-close`}
              icon="star-wars-x-mark"
              onClick={toggleFilter()}
            />
          </div>

          <div className={`filters__modal-filters f-col`}>
            {columns.map(dataColumn =>
              dataColumn.type === 'range' ? (
                <RangeFilter
                  key={`${dataColumn.name}-${dataColumn.type}`}
                  className={`filters__modal-filter--range`}
                  label={dataColumn.name.replace('_', ' ')}
                  values={!!state && state[dataColumn.name]}
                  updateValues={updatedValues => updateFilter(dataColumn.name, updatedValues)}
                  //                    activeValues={activeFilters?.[dataColumn.name]}
                  //                    updateActiveValues={newValues => updateFilter(dataColumn.name, newValues)}
                  resetFlag={resetFlag.current}
                />
              ) : (
                dataColumn.type === 'select' && (
                  <SelectFilter
                    key={`${dataColumn.name}-${dataColumn.type}`}
                    className={`filter__modal-filter--select`}
                    label={dataColumn.name.replace('_', ' ')}
                    values={!!state && state[dataColumn.name]}
                    updateValues={updatedValues => updateFilter(dataColumn.name, updatedValues)}
                  />
                )
              ),
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
      </dialog>
    </div>
  );
};
