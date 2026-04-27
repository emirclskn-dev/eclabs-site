import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-XXXXXXXXXX');

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default Analytics;
