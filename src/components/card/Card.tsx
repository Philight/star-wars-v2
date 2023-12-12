import React from 'react';
import { motion } from 'framer-motion';

import { Shape } from '@components/graphic';
import { Image } from '@components/media';
import { IMAGE_URLS } from '@data';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  data: { [key: string]: unknown };
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

export const Card = (props: IComponentProps): IGenericComponent => {
  const { className, data, onClick } = props;

  const id = data.url.split('/people/')[1].split('/')[0];

  return (
    <motion.div
      className={[`card__c f-center f-col`, className].css()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      <Image className={`card__image`} src={IMAGE_URLS.CHARACTERS.replace('$id', id)} withOverlay />
      <div className={`card__title f-center`}>
        <Shape className={`polygon`} />
        <h3 className={`f-center`}>{data.name}</h3>
      </div>
      <h3 className={`card__secondary-title f-center`}>{data.birth_year}</h3>
    </motion.div>
  );
};
