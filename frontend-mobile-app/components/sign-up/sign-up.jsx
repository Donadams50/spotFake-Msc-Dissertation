import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { images } from '../../constants';
import styles from "./sign-up.style";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ ModalMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handlSignUp = async () => {
    setIsLoading(true);
    // Validate form fields
    if (!name || !email || !password || !confirmPassword) {
      // Display error modal if any required fields are empty
      setIsLoading(false);
      setErrorMessage('Please fill in all required fields.');
      setErrorModalVisible(true);
      return;
    }
    if (password != confirmPassword) {
      // Display error modal if any required fields are empty
      setIsLoading(false);
      setErrorMessage('Pasword and confirm password do not match.');
      setErrorModalVisible(true);
      return;
    }
    try {
      console.log("here")
      console.log(password)
      console.log(email)
      const firstName = name.split(' ').slice(0, -1).join(' ');
      const lastName = name.split(' ').slice(-1).join(' ');
     
      // Make API call to sign up
      const response = await fetch('http://192.168.0.150:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username : name,
          email,
          password,
          firstname:firstName || "Spf"  ,
          lastname: lastName || "Spf"
        }),
      });
     
      const data = await response.json();
      console.log(data);
      if (data.status == 201) {

        console.log(data);
        // Navigate to the dashboard upon successful registration
        setIsLoading(false);
        

        router.push('/login');
      } else {
        setIsLoading(false);
        setErrorMessage(data.message);
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setErrorMessage("server error");
      setErrorModalVisible(true);
      // console.error('Error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.creatAccount}>CREATE YOUR ACCOUNT</Text>

        <View style={styles.downContainer}>
          <Image source={images.logo} style={styles.logo} />
          <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="gray" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          value={name}
                          placeholder="Enter your fullname"
                          onChangeText={setName}
                          required
                        />
          </View>
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
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlSignUp}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupOptions}>
            <Text style={styles.signupText}>Sign in with</Text>
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

          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.signinLink}>Signin</Text>
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

export default Signup;
