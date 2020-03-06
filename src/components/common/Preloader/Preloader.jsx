import React from 'react';


import preloaderGif from '../../../assets/preloader.gif';

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloaderGif} alt="Loading Gif Icon" />
    </div>
  );
};

export default Preloader;