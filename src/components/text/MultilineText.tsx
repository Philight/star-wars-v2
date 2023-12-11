import React from 'react';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  input: string;
  lines: number;
}

export const MultilineText = (props: IComponentProps): IGenericComponent => {
  const { className, input, lines = 1 } = props;

  const parseText = (text: string): string => {
    const splittedText = !!text && text.split(' ');
    const wordsLength = splittedText.length;
    if (wordsLength < 2) {
      return splittedText;
    }

    const isDivisible = wordsLength % lines === 0;
    const nextLineIndex = isDivisible ? wordsLength / lines : Math.ceil(wordsLength / lines);

    const textLines = [];
    let singleLine = [];
    for (let wordIndex = 0; wordIndex < wordsLength; wordIndex++) {
      singleLine.push(splittedText[wordIndex]);

      if (wordIndex === splittedText.length - 1 || (wordIndex + 1) % nextLineIndex === 0) {
        textLines.push(singleLine.join(' '));
        singleLine = [];
      }
    }
    return textLines;
  };

  return (
    <span className={[`multilinetext__c f-col`, className].css()}>
      {parseText(input).map((textLine, index) => (
        <span key={`mlt-${index}`} className={`multilinetext__line text-nowrap`}>
          {textLine}
        </span>
      ))}
    </span>
  );
};
