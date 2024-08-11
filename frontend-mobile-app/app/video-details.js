import  {SafeAreaView} from 'react-native';

import {Footer, Header, VideoDetails} from '../components';

import styles from "../components/common/backgroundimage/Backgroundimage.style";

const VideoDetailsBase = () => {
    return (
    <SafeAreaView style = {styles.safeAreaView}>
      
        <Header />
            
        <VideoDetails />
             
        <Footer />
  
    </SafeAreaView>
    );
};

export default VideoDetailsBase;