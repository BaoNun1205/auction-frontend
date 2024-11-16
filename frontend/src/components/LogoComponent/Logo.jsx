import React from 'react';
import myImage from '~/assets/images/logo/logo.png';

const Logo = () => {
  return (
    <div>
      <img src={myImage} alt="Logo" style={{ width: '150px', height: 'auto' }} />
    </div>
  );
};

export default Logo;
