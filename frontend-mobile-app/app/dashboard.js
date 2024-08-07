import  {SafeAreaView} from 'react-native';

import {Footer, Header, Dashboard} from '../components';

import styles from "../components/common/backgroundimage/Backgroundimage.style";

const DashboardBase = () => {
    return (
    <SafeAreaView style = {styles.safeAreaView}>
      
        <Header />
            
        <Dashboard />
             
        <Footer />
  
    </SafeAreaView>
    );
};

export default DashboardBase;