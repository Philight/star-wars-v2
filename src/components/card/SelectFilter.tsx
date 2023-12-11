import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@components/action';
import { Shape } from '@components/graphic';
import { MultilineText } from '@components/text/MultilineText';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  data: { [key: string]: unknown };
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const SelectFilter = (props: IComponentProps): IGenericComponent => {
  const { className, label, values, updateValues } = props;

  const containerRef = useRef(null);
  const filterKeys = Object.keys(values) ?? [];

  const toggleValue = key => () => {
    const updatedValues = values;
    updatedValues[key].active = !updatedValues[key].active;
    updateValues(updatedValues);
  };

  return (
    <div className={[`filter__c select f-col`, className].css()} ref={containerRef}>
      {!!label && <label>{label}</label>}
      <motion.div
        className={`select-filter__slider f-center-y`}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={1}
      >
        {filterKeys.map(key => (
          <Button
            key={key}
            className={[`select-filter__value f-center`, values[key].active && 'active'].css()}
            type="outline"
            size="lg"
            role="button"
            onClick={toggleValue(key)}
          >
            <MultilineText input={values[key].label} lines={2} />
          </Button>
        ))}
      </motion.div>
    </div>
  );
};
