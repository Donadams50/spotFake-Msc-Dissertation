import  {SafeAreaView} from 'react-native';

import {Footer, Header, UploadVideo} from '../components';

import styles from "../components/common/backgroundimage/Backgroundimage.style";

const UploadVideoBase = () => {
    return (
    <SafeAreaView style = {styles.safeAreaView}>
      
        <Header />
            
        <UploadVideo />
             
        <Footer />
  
    </SafeAreaView>
    );
};

export default UploadVideoBase;