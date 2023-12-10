import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useDragControls, animate } from 'framer-motion';

import { Header, Footer } from '@components/layout';
import { Logo, Icon, Layer } from '@components/graphic';
import { Image } from '@components/media';
import { usePageData, useDeviceDimensions } from '@utils';

import BackgroundImg from '@images/landing_background.png';

const ARROWS_ANIM = {
  animate: {
    opacity: [0.4, 1, 0.4],
    translateY: [-3, 3, -3],
  },
  transition: {
    ease: 'linear',
    duration: 1.6,
    repeat: Infinity,
  },
};

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
  //  Page?: React.FC | React.Component | React.ReactNode | JSX.Element | React.ElementType;
  Page?: React.ElementType;
}

const LandingLayout = ({ Page, ...rest }: IComponentProps): IGenericComponent => {
  const { className } = rest;
  const { pageData, setPageData } = usePageData();

  const { DEVICE_HEIGHT } = useDeviceDimensions();

  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStart = React.useRef(null);
  const overlayRef = React.useRef(null);

  const mDragX = useMotionValue(0);
  const mDragY = useMotionValue(0);
  const aDragOpacity = useTransform(mDragY, [-160, 0, 0], [1, 0.3, 0.3]);

  const mDragStage = useMotionValue(0);
  const aLogoScale = useTransform(mDragStage, [0, 1], [1, 0]);
  const aRadiusScale = useTransform(mDragStage, [1, 2], [0, 2]);
  const aPageZ = useTransform(mDragStage, [1, 2], [-20, 30]);

  const mCurtainStage = useMotionValue(0);
  const aCurtainY = useTransform(mCurtainStage, [0, 1], ['100%', '0%']);

  const MIN_SWIPE_DISTANCE = -300; // ↑ UP
  const DRAG_ZONE_TOP = (DEVICE_HEIGHT * 1) / 5;

  const ANIMATIONS = {
    draggingStage: mDragStage,
    curtainStage: mCurtainStage,
  };

  const animateEffect = async (
    element: string,
    fromValue: number,
    toValue: number,
    options?: unknown = {},
  ): (() => void) => {
    const { delay, ease, duration } = options;
    const motionValue = ANIMATIONS[element];
    return new Promise(resolve => {
      motionValue.set(fromValue);
      const animation = animate(motionValue, toValue, {
        ease: ease ?? 'linear',
        duration: duration ?? 0.4,
        delay: delay,
        onComplete: () => {
          resolve(true);
        },
      });
      return () => animation.stop();
    });
  };

  const runAnimations = (animationType): void => {
    console.log('runAnimations overlayRef.current', overlayRef.current);
    console.log('runAnimations animationType', animationType);
    overlayRef.current = animationType;

    if (animationType === 'radius') {
      animateEffect('draggingStage', 0, 1, { ease: 'easeInOut', duration: 0.8 }).then(() => {
        animateEffect('draggingStage', 1, 2, { ease: 'easeInOut', duration: 0.8 }).then(() => {
          animateEffect('draggingStage', 2, 3, { ease: 'easeIn', duration: 3, delay: 0.4 }).then(
            () => {
              animateEffect('draggingStage', 3, 4, { ease: 'easeIn', duration: 1.6 }).then(() => {
                animateEffect('draggingStage', 4, 5, { ease: 'easeIn', duration: 1.6 });
              });
            },
          );
        });
      });
    } else {
      animateEffect('curtainStage', 0, 1, { ease: 'easeInOut', duration: 0.6 }).then(() => {
        animateEffect('draggingStage', 1, 2, { ease: 'easeInOut', duration: 0.8 }).then(() => {
          animateEffect('draggingStage', 2, 3, { ease: 'easeIn', duration: 3, delay: 0.4 }).then(
            () => {
              animateEffect('draggingStage', 3, 4, { ease: 'easeIn', duration: 1.6 }).then(() => {
                animateEffect('draggingStage', 4, 5, { ease: 'easeIn', duration: 1.6 });
              });
            },
          );
        });
      });
    }
  };

  const onDragStart = (event, info) => {
    console.log('onDragStart', event, info.point.x, info.point.y);
    dragStart.current = {
      x: info.point.x,
      y: info.point.y,
    };
    //    dragControls.start(event)
    setIsDragging(true);
  };

  const onDragEnd = (event, info) => {
    const diffX = info.point.x - dragStart.current.x;
    const diffY = info.point.y - dragStart.current.y;
    console.log('onDragEnd dragStart.current', dragStart.current);
    console.log('onDragEnd difference X', diffX);
    console.log('onDragEnd difference Y', diffY);
    //    if (diffY <= MIN_SWIPE_DISTANCE) {
    console.log('onDragEndDRAG_ZONE_TOP', DRAG_ZONE_TOP);
    if (info.point.y <= DRAG_ZONE_TOP) {
      // change stage
      runAnimations('radius');
    }
    dragStart.current = null;
    setIsDragging(false);
  };

  return (
    <div className={[`layout__c landing page-${pageData.page} f-center`, className].css()}>
      <Image className={`layout__background abs-fill`} src={BackgroundImg} isBkg withOverlay />

      <section className={`layout__drag-here f-center f-col abs-center-x`}>
        <label className={`h2`}>DRAG HERE</label>
        <Icon
          icon="double-arrow"
          className={`layout__arrows`}
          animate={ARROWS_ANIM.animate}
          transition={ARROWS_ANIM.transition}
        />
      </section>

      <motion.section
        className={`layout__logo abs-center f-center h-[200%] w-[200%]`}
        style={{ x: '-50%', y: '-50%' }}
      >
        <Layer
          className={`layout__overlay circle`}
          style={{ opacity: aDragOpacity, x: mDragX, y: mDragY }}
        />
        <motion.div
          className={[`draggable f-center`, isDragging && 'dragging'].css()}
          style={{
            x: mDragX,
            y: mDragY,
            cursor: 'grab',
            scale: aLogoScale,
          }}
          drag
          dragConstraints={{
            //            top: '-50%',
            top: -DEVICE_HEIGHT / 4,
            left: -10,
            right: 10,
            bottom: 0,
          }}
          dragControls={dragControls}
          //        onPointerDown={onDragStart}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          //        dragListener={false}
          //                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <Logo
            className={``}
            //        animate={ARROWS_ANIM.animate}
            //        transition={ARROWS_ANIM.transition}
          />
        </motion.div>
      </motion.section>
      <Layer
        className={`layout__overlay radius`}
        style={{ scale: overlayRef.current === 'radius' ? aRadiusScale : 0 }}
      />

      <section
        className={[
          `layout__continue f-center f-col abs-center-x`,
          isDragging && 'opacity-0',
        ].css()}
        onClick={() => {
          overlayRef.current = 'curtain';
          runAnimations('curtain');
        }}
      >
        <label className={`h2`}>CONTINUE</label>
        <Icon
          icon="double-arrow"
          className={`layout__arrows`}
          animate={ARROWS_ANIM.animate}
          transition={ARROWS_ANIM.transition}
        />
      </section>
      <Layer className={`layout__overlay curtain`} style={{ y: aCurtainY }} />

      {Page && <Page />}
      <Outlet
        context={{
          layoutProps: {
            animationProps: { motionValues: { mDragStage } },
            style: { zIndex: aPageZ },
          },
          setPageData,
        }}
      />
    </div>
  );
};

export default LandingLayout;
