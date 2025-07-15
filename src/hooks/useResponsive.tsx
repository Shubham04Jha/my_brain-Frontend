
import { useState, useEffect } from 'react';

const useResponsive = (breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width < breakpoints.md, 
    isTablet: width >= breakpoints.md && width < breakpoints.lg, 
    isDesktop: width >= breakpoints.lg, 
  };
};

export default useResponsive;