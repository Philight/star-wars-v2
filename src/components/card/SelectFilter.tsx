import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Shape } from '@components/graphic';
import { MultilineText } from '@components/text/MultilineText';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  data: { [key: string]: unknown };
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const SelectFilter = (props: IComponentProps): IGenericComponent => {
  const { className, values, updateFilter } = props;

  const containerRef = useRef(null);
  const filterKeys = !!values && Object.keys(values);

  const toggleValue = key => () => {
    const updatedValues = values;
    updatedValues[key].active = !updatedValues[key].active;
    updateFilter(updatedValues);
  };

  return (
    <div className={`select-filter__c flex-center-v ${className}`} ref={containerRef}>
      <motion.div
        className={`select-filter__slider flex-center-v`}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={1}
      >
        {!!filterKeys &&
          filterKeys.map(key => (
            <div
              className={`select-filter__value flex-center ${values[key].active && 'active'}`}
              key={key}
              onClick={toggleValue(key)}
            >
              <Shape className={`polygon`} />
              <span className={`select-filter__value-name flex-center btn-text-sm`}>
                <MultilineText input={values[key].label} lines={2} />
              </span>
            </div>
          ))}
      </motion.div>
    </div>
  );
};
