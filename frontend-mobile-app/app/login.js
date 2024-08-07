import  {SafeAreaView} from 'react-native';

import {Login, ModalMessage} from '../components';

import styles from "../components/common/backgroundimage/Backgroundimage.style";

const SignInBase = () => {

    return (
        <SafeAreaView style = {styles.safeAreaView}>
              <Login ModalMessage={ModalMessage}></Login>
        </SafeAreaView>
      );
}


export default SignInBase;