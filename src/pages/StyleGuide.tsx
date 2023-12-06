// @ts-nocheck
import React, { useState, useEffect, useLayoutEffect, useRef, useContext, forwardRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

const TAILWIND_FONT_SIZES: { [key: string]: unknown } = {
  'text-5xs': {
    'font-size': '0.5rem / 8px',
    'line-height': '0.625rem / 10px',
  },
  'text-4xs': {
    'font-size': '0.5625rem / 9px',
    'line-height': '0.6875rem / 11px',
  },
  'text-3xs': {
    'font-size': '0.625rem / 10px',
    'line-height': '0.75rem / 12px',
  },
  'text-2xs': {
    'font-size': '0.6875rem / 11px',
    'line-height': '0.875rem / 14px',
  },
  'text-xs': {
    'font-size': '0.75rem / 12px',
    'line-height': '1rem / 16px',
  },
  'text-xs-plus': {
    'font-size': '0.8125rem / 13px',
    'line-height': '1.125rem / 18px',
  },
  'text-sm': {
    'font-size': '0.875rem / 14px',
    'line-height': '1.25rem / 20px',
  },
  'text-base': {
    'font-size': '1rem / 16px',
    'line-height': '1.5rem / 24px',
  },
  'text-base-plus': {
    'font-size': '1.0625rem / 17px',
    'line-height': '1.625rem / 26px',
  },
  'text-lg': {
    'font-size': '1.125rem / 18px',
    'line-height': '1.75rem / 28px',
  },
  'text-xl': {
    'font-size': '1.25rem / 20px',
    'line-height': '1.75rem / 28px',
  },
  'text-2xl': {
    'font-size': '1.5rem / 24px',
    'line-height': '2rem / 32px',
  },
  'text-3xl-minus': {
    'font-size': '1.75rem / 28px',
    'line-height': '2.125rem / 34px',
  },
  'text-3xl': {
    'font-size': '1.875rem / 30px',
    'line-height': '2.25rem / 36px',
  },
  'text-3xl-plus': {
    'font-size': '2rem / 32px',
    'line-height': '2.375rem / 38px',
  },
  'text-4xl': {
    'font-size': '2.25rem / 36px',
    'line-height': '2.5rem / 40px',
  },
  'text-4xl-plus': {
    'font-size': '2.5rem / 40px',
    'line-height': '1 / 40px',
  },
  'text-5xl-minus': {
    'font-size': '2.75rem / 44px',
    'line-height': '1 / 44px',
  },
  'text-5xl': {
    'font-size': '3rem / 48px',
    'line-height': '1 / 48px',
  },
  'text-6xl': {
    'font-size': '3.75rem / 60px',
    'line-height': '1 / 60px',
  },
  'text-7xl': {
    'font-size': '4.5rem / 72px',
    'line-height': '1 / 72px',
  },
  'text-8xl': {
    'font-size': '6rem / 96px',
    'line-height': '1 / 96px',
  },
  'text-9xl': {
    'font-size': '8rem / 128px',
    'line-height': '1 / 128px',
  },
};

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {}

const FontSizes = (): IGenericComponent => (
  <section className={['style-guide__font-sizes'].css()}>
    <h2>Font sizes</h2>
    <div className={['overflow-x-scroll'].css()}>
      <table>
        <thead>
          <tr>
            <th className={[].css()}>---</th>
            {Object.keys(TAILWIND_FONT_SIZES).map(col => (
              <th key={col} data-type={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={[].css()}>font-size</td>
            {Object.keys(TAILWIND_FONT_SIZES).map(col => (
              <td key={col} className={[].css()}>{TAILWIND_FONT_SIZES[col]['font-size']}</td>
            ))}
          </tr>
          <tr>
            <td className={[].css()}>line-height</td>
            {Object.keys(TAILWIND_FONT_SIZES).map(col => (
              <td key={col} className={[].css()}>{TAILWIND_FONT_SIZES[col]['line-height']}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);

const StyleGuide = (props: IComponentProps): IGenericComponent => {
  const { className } = props;

  return (
    <main className={['page__c style-guide', className].css()}>
      <h1>Typography</h1>
      <FontSizes />
    </main>
  );
};

export default StyleGuide;
