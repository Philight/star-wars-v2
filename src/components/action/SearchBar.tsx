import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Icon, Shape } from '@components/graphic';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  placeholder?: string;
  onChange?: (_: any) => void;
  onEnter?: (_: any) => void;
}

export const SearchBar = (props: IComponentProps): IGenericComponent => {
  const { className, placeholder, onChange, onEnter } = props;

  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  //  const debounced = useDebouncedCallback((value) => { setValue(value); }, 1000);
  const updateInputValue = useDebouncedCallback((newValue: string): void => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  }, 150);

  const updateSearchValue = (newValue: string): void => {
    setSearchValue(newValue);
    if (onEnter) {
      onEnter(newValue);
    }
  };

  const handleFocus = (isFocusedFlag: boolean) => (): void => {
    setIsFocused(isFocusedFlag);
  };

  const handleTyping =
    () =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      updateInputValue((event.target as HTMLInputElement).value);
    };

  const handleKeyDown =
    () =>
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      const keyCode = event.keyCode || event.which;
      if (keyCode === 13 || event.key === 'Enter') {
        updateSearchValue((event.target as HTMLInputElement).value);
      }
    };

  const handleReset = () => () => {
    updateInputValue('');
    updateSearchValue('');
  };

  return (
    <div
      className={[
        `search-bar__c f-center-y`,
        className,
        isFocused && 'focused',
        searchValue && 'searching',
      ].css()}
    >
      <Icon className={`search-bar__icon`} icon="search-1" />

      <input
        className={[`search-bar__input f-center`, className].css()}
        type="text"
        placeholder={placeholder ?? `Jedi..`}
        value={value}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        onChange={handleTyping()}
        onKeyDown={handleKeyDown()}
      />

      <Shape className={`search-bar__divider`} />
      <Icon className={`search-bar__icon reset`} icon="star-wars-x-mark" onClick={handleReset()} />
    </div>
  );
};
