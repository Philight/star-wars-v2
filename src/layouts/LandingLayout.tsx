import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useDragControls  } from 'framer-motion';

import { Header, Footer } from '@components/layout';
import { Logo, Icon, Layer } from '@components/graphic';
import { Image } from '@components/media';
import { usePageData } from '@utils';

import BackgroundImg from '@images/landing_background.png';

const ARROWS_ANIM = {
  animate: {
    opacity: [ 0.4, 1, 0.4 ],
    translateY: [ -3, 3, -3 ]
  },
  transition: {
    ease: 'linear',
    duration: 1.6,
    repeat: Infinity
  }
};

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IComponentProps extends IGenericProps {
//  Page?: React.FC | React.Component | React.ReactNode | JSX.Element | React.ElementType;
  Page?: React.ElementType;
}

const LandingLayout = ({ Page, ...rest }: IComponentProps): IGenericComponent => {
  const { className } = rest;
  const { pageData, setPageData } = usePageData();

  const MIN_SWIPE_DISTANCE = -200; // ↑ UP

  const dragControls = useDragControls();
  const dragStart = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const mDragX = useMotionValue(0);
  const mDragY = useMotionValue(0);
  const aOpacity = useTransform(mDragY, [-120, 0, 120], [1, 0.3, 1]);

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
    if (diffY <= MIN_SWIPE_DISTANCE) {
      // change stage
    }
    dragStart.current = null;
    console.log('onDragEnd dragStart.current', dragStart.current);
    setIsDragging(false);
  }

  return (
    <div className={[`layout__c landing page-${pageData.page} f-center`, className].css()}>
      <Image className={`layout__background abs-fill`} src={BackgroundImg} isBkg withOverlay />

      <section
        className={`layout__drag-here f-center f-col abs-center-x`}
//        onClick={nextStage(1)}
      >
        <label className={`h2`}>DRAG HERE</label>
        <Icon
          icon='double-arrow'
          className={`layout__arrows`}
          animate={ARROWS_ANIM.animate}
          transition={ARROWS_ANIM.transition}
        />
      </section>

      <motion.section className={`layout__logo abs-center f-center w-[200%] h-[200%]`}>
        <Layer className={`layout__overlay radius`} style={{ opacity: aOpacity, x: mDragX, y: mDragY, }} />
        <motion.div 
          className={[`draggable f-center`, isDragging && 'dragging'].css()}
          style={{
            x: mDragX,
            y: mDragY,
            cursor: "grab",
          }}
          drag
          dragConstraints={{
//            top: '-50%',
            top: -160,
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
          whileTap={{ cursor: "grabbing" }}        
        >
          <Logo
            className={``}
    //        animate={ARROWS_ANIM.animate}
    //        transition={ARROWS_ANIM.transition}
          />        
        </motion.div>
      </motion.section>


      <section
        className={`layout__continue f-center f-col abs-center-x`}
//        onClick={nextStage(1)}
      >
        <label className={`h2`}>CONTINUE</label>
        <Icon
          icon='double-arrow'
          className={`layout__arrows`}
          animate={ARROWS_ANIM.animate}
          transition={ARROWS_ANIM.transition}
        />
      </section>
      <Layer className={`layout__overlay curtain`} style={{ opacity: aOpacity }} />

      {Page && <Page />}
      <Outlet context={{ setPageData }} />
    </div>
  );
};

export default LandingLayout;
