import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const regex = /overview|exchange|mine/i;

    if (regex.test(pathname)) return;

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
