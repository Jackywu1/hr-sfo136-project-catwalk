import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

export default function LazyImage({ src, alt }) {
  const image = useRef(null);

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          image.current.src = src;
          observer = observer.disconnect();
        }
      });
    }, { rootMargin: '0px 200px 0px 0px' });
    if (image.current) { observer.observe(image.current); }
  }, []);

  return <img className="product-preview" ref={image} alt={alt} height="300px" width="300px" />;
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
