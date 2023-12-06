import React, { useState, useEffect, useRef } from 'react';

interface IOptions {
  onCompleted?: (
    name: string,
    svgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined,
  ) => void;
  onError?: (err: Error | unknown) => void;
  fileType?: 'icons' | 'images';
  suffix?: string;
}

export const useDynamicFileImport = (fileName: string, options: IOptions = {}) => {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>();

  const { onCompleted, onError, fileType = 'icons', suffix = 'svg' } = options;

  const PATH_OPTIONS = {
    icons: `../../../src/assets/icons/${fileName}.${suffix}`,
    images: `../../../src/assets/images/${fileName}.${suffix}`,
    logos: `../../../src/assets/logos/${fileName}.${suffix}`,
  };

  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        /*
        ImportedIconRef.current = (await import(PATH_OPTIONS[fileType])).ReactComponent;
*/
        const { default: namedImport } = await import(PATH_OPTIONS[fileType]);
        ImportedIconRef.current = namedImport;

        onCompleted?.(fileName, ImportedIconRef.current);
      } catch (err) {
        console.error('useDynamicFileImport error', err);
        setError(err);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [fileName, onCompleted, onError]);

  return { error, loading, svgIcon: ImportedIconRef.current };
};
