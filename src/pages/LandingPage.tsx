// import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useDragControls, animate } from 'framer-motion';

import { Button } from '@components/action';
import { Shape, Logo } from '@components/graphic';
import { withPageData } from '@utils';

const INTRO_TEXT = `May The Force Be With You`;
const BUTTON_TEXT = `ENTER`;

const FADE_ANIM = {
  initial: {
    //    opacity: 0
  },
  animate: {
    opacity: 1,
  },
  transition: {
    ease: 'linear',
    duration: 1.2,
  },
};

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IPageProps extends IGenericProps {
  animationProps?: unknown;
}

const LandingPage = (props: IPageProps): IGenericComponent => {
  const { className, style, currentTransStage, animationProps = {} } = props;
  const { layoutProps } = useOutletContext();
  const navigate = useNavigate();

  const { motionValues } = layoutProps.animationProps;
  const aHeadingOpacity = motionValues && useTransform(motionValues.mDragStage, [2, 3], [0, 1]);
  const aSubheadingOpacity = motionValues && useTransform(motionValues.mDragStage, [3, 4], [0, 1]);

  const aRevealOpacity = motionValues && useTransform(motionValues.mDragStage, [4, 5], [0, 1]);

  const goToAvatars = (e): void => {
    e.preventDefault();
    navigate(`/avatars`);
  };

  return (
    <motion.main
      className={['page__c landing f-col f-center', layoutProps.className].css()}
      style={layoutProps.style}
    >
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
