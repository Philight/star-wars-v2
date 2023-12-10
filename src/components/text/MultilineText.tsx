import React from 'react';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  data: { [key: string]: unknown };
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const MultilineText = (props: IComponentProps): IGenericComponent => {
  const { className, input, lines } = props;

  const parseText = text => {
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
    <span className={`multilinetext__c ${className}`}>
      {parseText(input).map((textLine, index) => (
        <span key={`mlt-${index}`} className={`multilinetext__line`}>
          {textLine}
        </span>
      ))}
    </span>
  );
};
