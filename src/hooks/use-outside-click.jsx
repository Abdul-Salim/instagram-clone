import { useCallback, useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
  const handleClick = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }, [callback, ref]);

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};

export default useOutsideClick;
