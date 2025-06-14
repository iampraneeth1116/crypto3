import { useRef, useEffect } from 'react';

export const useCursor = () => {
  const cursorRef = useRef(null);
  const cursorPointerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorPointer = cursorPointerRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (cursor && cursorPointer) {
        cursor.style.left = `${clientX}px`;
        cursor.style.top = `${clientY}px`;
        cursorPointer.style.left = `${clientX}px`;
        cursorPointer.style.top = `${clientY}px`;
      }
    };

    const handleMouseDown = () => {
      if (cursor && cursorPointer) {
        cursor.style.transform = 'scale(1.5)';
        cursorPointer.style.transform = 'scale(1.5)';
      }
    };

    const handleMouseUp = () => {
      if (cursor && cursorPointer) {
        cursor.style.transform = 'scale(1)';
        cursorPointer.style.transform = 'scale(1)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { cursorRef, cursorPointerRef };
};