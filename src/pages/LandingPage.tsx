// import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useDragControls, animate } from 'framer-motion';

import { Button } from '@components/action';
import { Logo } from '@components/graphic';
import { withPageData } from '@utils';

const INTRO_TEXT = `May The Force Be With You`;
const BUTTON_TEXT = `ENTER`;

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IPageProps extends IGenericProps {}

const LandingPage = (): IGenericComponent => {
  const { layoutProps }: IPageProps = useOutletContext();
  const { className, style, animationProps } = layoutProps;

  const navigate = useNavigate();

  const motionValues = animationProps?.motionValues;
  const aHeadingOpacity = useTransform(motionValues?.mDragStage, [2, 3], [0, 1]);
  const aSubheadingOpacity = useTransform(motionValues?.mDragStage, [3, 4], [0, 1]);

  const aRevealOpacity = useTransform(motionValues?.mDragStage, [4, 5], [0, 1]);

  const goToAvatars = (e): void => {
    e.preventDefault();
    navigate(`/avatars`);
  };

  return (
    <motion.main className={['page__c landing f-col f-center', className].css()} style={style}>
      <Logo className={``} style={{ opacity: aRevealOpacity }} />
      <motion.h2 className={`page__heading`} style={{ opacity: aHeadingOpacity }}>
        {INTRO_TEXT}
      </motion.h2>
      <motion.h3 className={`page__subheading`} style={{ opacity: aSubheadingOpacity }}>
        {INTRO_TEXT}
      </motion.h3>

      <Button
        className={`page__button f-center`}
        type="outline"
        size="lg"
        role="button"
        label={BUTTON_TEXT}
        onClick={goToAvatars}
        style={{ opacity: aRevealOpacity }}
      />
    </motion.main>
  );
};

const pageData = { page: 'landing', img: '' };
export default withPageData(LandingPage, pageData);
