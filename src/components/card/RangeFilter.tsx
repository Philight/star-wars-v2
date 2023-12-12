import React, { useState, useEffect, useRef } from 'react';

import { Icon, Shape } from '@components/graphic';
import { useDeviceDimensions } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';

const SliderThumb = ({ position, index, updateIndex, step }): IGenericComponent => {
  const { DEVICE_IS_TOUCH } = useDeviceDimensions();
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);

  const MIN_DISTANCE = 50;

  useEffect(() => {
    if (isDragging) {
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    }
  }, [isDragging]);

  const onDragStart = (e): void => {
    const startX = DEVICE_IS_TOUCH ? e.targetTouches[0].clientX : e.clientX;
    dragStart.current = startX;
  };

  const onDragMove = (e): void => {
    const movedX = DEVICE_IS_TOUCH ? e.targetTouches[0].clientX : e.clientX;

    const distance = movedX - dragStart.current;
    if (distance === 0) {
      return;
    }

    const coefficient = distance < 0 ? -1 : 1;

    if (distance * coefficient < MIN_DISTANCE) {
      return;
    }

    if (!isDragging) {
      setIsDragging(true);
      updateIndex(position, coefficient);
      dragStart.current = movedX;
    }
  };

  const onDragEnd = (): void => {
    dragStart.current = null;
    setIsDragging(false);
  };

  return (
    <div
      className={`range-slider__thumb ${position} f-center`}
      style={{ [position]: `${index * step}%` }}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
      onDragEnter={onDragStart}
      onDragOver={onDragMove}
      onDragLeave={onDragEnd}
    >
      <Icon className={`range-slider__thumb-icon`} icon="darth-vader" />
      <Shape className={`range-slider__thumb-bkg`} />
    </div>
  );
};

interface IComponentProps extends IGenericProps {
  allValues: string[] | number[];
  activeValues: string[] | number[];
  updateActiveValues: (_newValues: string[] | number[]) => void;
}

export const RangeFilter = (props: IComponentProps): IGenericComponent => {
  const { className, label, values, updateValues, resetFlag } = props;

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  const filterKeys = Object.keys(values) ?? [];

  // Percentage
  const step = 100 / (filterKeys?.length - 1);

  useEffect(() => {
    if (!!updateValues && filterKeys) {
      const newValues = { ...values };
      for (let i = 0; i < filterKeys.length; i++) {
        newValues[filterKeys[i]].active = i >= leftIndex && i <= filterKeys.length - 1 - rightIndex;
      }
      updateValues(newValues);
    }
  }, [leftIndex, rightIndex]);

  useEffect(() => {
    setLeftIndex(0);
    setRightIndex(0);
  }, [resetFlag]);

  const updateIndex = (thumbPosition, coefficient) => {
    if (thumbPosition?.toLowerCase() === 'left') {
      setLeftIndex(prevIndex => {
        const isIncrement = coefficient >= 0;
        if (!isIncrement && prevIndex === 0) {
          return 0;
        }
        if (isIncrement && prevIndex === filterKeys?.length - 2 - rightIndex) {
          return filterKeys?.length - 2 - rightIndex;
        }
        return prevIndex + coefficient;
      });
    } else if (thumbPosition?.toLowerCase() === 'right') {
      setRightIndex(prevIndex => {
        const isIncrement = coefficient >= 0;
        if (isIncrement && prevIndex === 0) {
          return 0;
        }
        // move LEFT
        if (!isIncrement && prevIndex === filterKeys?.length - 2 - leftIndex) {
          return filterKeys?.length - 2 - leftIndex;
        }
        return prevIndex + -1 * coefficient;
      });
    }
  };

  return (
    <div className={[`filter__c range f-col`, className].css()}>
      {!!label && <label>{label}</label>}
      <div className={`range-slider__slider f-center-y`}>
        <div className={`range-slider__values`}>
          <label>
            {filterKeys[leftIndex]} - {filterKeys[filterKeys?.length - 1 - rightIndex]}
          </label>
        </div>
        <Shape className={`range-slider__track light-saber`} />
        <Shape className={`range-slider__path light-saber`} />

        <SliderThumb position="left" index={leftIndex} updateIndex={updateIndex} step={step} />

        <SliderThumb position="right" index={rightIndex} updateIndex={updateIndex} step={step} />
      </div>
    </div>
  );
};
