import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { images } from '../../constants';
import styles from "./login.style";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ ModalMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    // router.push('/dashboard');
    // Validate form fields
    if (!email || !password) {
      // Display error modal if any required fields are empty
      setIsLoading(false);
      setErrorMessage('Please fill in all required fields.');
      setErrorModalVisible(true);
      return;
    }
    try {
      
      // Make API call to sign up
      const response = await fetch('http://192.168.0.150:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      const data = await response.json();
      
      if (data.status == 200) {
        console.log(data.data.token)
        console.log(data.data.profile.memberId)
        await AsyncStorage.setItem('token', data.data.token);
        await AsyncStorage.setItem('userId', data.data.profile.memberId);
        // Navigate to the dashboard upon successful registration
        setIsLoading(false);
        router.push('/dashboard');
      } else {
        setIsLoading(false);
        setErrorMessage(data.message);
        setErrorModalVisible(true);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("server error");
      setErrorModalVisible(true);
      console.error('Error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.welcomeBack}>WELCOME BACK!</Text>

        <View style={styles.downContainer}>
          <Image source={images.logo} style={styles.logo} />
          <Text style={styles.instructions}>Enter your details below to enter your dashboard.</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signinOptions}>
            <Text style={styles.signinText}>Sign in with</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity onPress={() => router.push('/sign-up')}>
                <Ionicons name="logo-facebook" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/sign-up')}>
                <Ionicons name="logo-apple" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/sign-up')}>
                <Ionicons name="logo-google" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ModalMessage
          visible={errorModalVisible}
          message={errorMessage}
          onClose={() => setErrorModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
