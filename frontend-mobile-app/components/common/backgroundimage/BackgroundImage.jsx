import React from 'react';
import { ImageBackground } from 'react-native';

import styles from "./Backgroundimage.style";


const BackgroundImage = ({ source }) => {
  return (
    <ImageBackground
      source={source}
      style={styles.backgroundImage}
    >
   
    </ImageBackground>
    
  );
};

export default BackgroundImage;
