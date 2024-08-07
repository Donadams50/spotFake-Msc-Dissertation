import  {SafeAreaView} from 'react-native';

import {Footer, Header, VideoList} from '../components';

import styles from "../components/common/backgroundimage/Backgroundimage.style";

const VideoListBase = () => {
    return (
    <SafeAreaView style = {styles.safeAreaView}>
      
        <Header />
            
        <VideoList />
             
        <Footer />
  
    </SafeAreaView>
    );
};

export default VideoListBase;