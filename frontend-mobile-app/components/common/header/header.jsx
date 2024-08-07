import { View,  Image, Text } from 'react-native';
import styles from "./header.style";
import { icons } from "../../../constants";
import { images } from '../../../constants';
const Header = () => {
  return (
    <View style={styles.container}>
  
        
        <View style={styles.iconContainer}>
            <Image
            source={images.logoNoName}
            style={styles.icon}
            
            resizeMode="contain"
            />
        </View>
        <Text style={styles.logoText}>SpotFAKE</Text>


     
   
      
     
     
    </View>
  );
};


export default Header;
