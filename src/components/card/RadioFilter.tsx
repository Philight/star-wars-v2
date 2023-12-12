import React, { useRef } from 'react';
import { Shape } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  data: { [key: string]: unknown };
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const RadioFilter = (props: IComponentProps): IGenericComponent => {
  const { className, label, values, updateValues } = props;

  const containerRef = useRef(null);
  const filterKeys = Object.keys(values) ?? [];

  const toggleValue = key => () => {
    const updatedValues = { ...values };
    updatedValues[key].active = !updatedValues[key].active;
    updateValues(updatedValues);
  };

  return (
    <div className={[`filter__c radio`, className].css()} ref={containerRef}>
      {!!label && <label>{label}</label>}

      <div className={[`radio-filter__values f-col`].css()}>
        {filterKeys.map(key => (
          <div
            className={[`radio-filter__value f-center-y`, values[key].active && 'active'].css()}
            key={key}
            onClick={toggleValue(key)}
          >
            <label className={`radio-filter__value-name f-center`}>{values[key].label}</label>
            <figure className={`radio-filter__value-toggle`}>
              <Shape className={`polygon`} />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};
