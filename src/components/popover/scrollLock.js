import { useEffect } from 'react';

const ScrollLock = ({ isOpen }) => {
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollbarWidth}px`;
      body.style.position = 'fixed';
      body.style.width = '100%';
      body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = parseInt(body.style.top || '0');
      body.style.overflow = '';
      body.style.paddingRight = '';
      body.style.position = '';
      body.style.width = '';
      body.style.top = '';
      window.scrollTo(0, scrollY);
    }

    return () => {
      body.style.overflow = '';
      body.style.paddingRight = '';
      body.style.position = '';
      body.style.width = '';
      window.scrollTo(0, 0);
    };
  }, [isOpen]);

  return null; 
};

export default ScrollLock;
