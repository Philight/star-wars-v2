import React, { lazy } from 'react';

interface IStringMapping {
  [key: string]: string;
}

interface IArguments {
  prefix?: string;
  suffix?: string;
}

export interface IImportMapping {
  [key: string]: React.ComponentType | null | undefined;
}

export const dynamicImport = (mapping: IStringMapping, args: IArguments = {}): IImportMapping => {
  const { prefix = '', suffix = '' } = args;
  const obj: IImportMapping = {};

  for (const key in mapping) {
    if (key in mapping) {
      const componentName = mapping[key];
      obj[key] = lazy(() => import(`../../../src/${prefix}/${componentName}${suffix}.tsx`));
    }
  }
  return obj;
};
