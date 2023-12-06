import React, { useRef, useEffect } from 'react';

export const useInterval = (
  callback: () => unknown,
  delay: number,
): React.RefObject<number | undefined> => {
  const intervalRef = useRef<number | undefined>(undefined);
  const savedCallback = useRef<() => unknown>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = (): unknown => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = setInterval(tick, delay);
      return () => clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
};
