import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router';
import styles from './footer.style';

const Footer = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Update the selected tab based on the current route
    const currentRoute = segments[0]; // Assuming single-level routes
    switch (currentRoute) {
      case 'dashboard':
        setSelectedTab('home');
        break;
      case 'upload-video':
        setSelectedTab('upload');
        break;
      case 'history':
        setSelectedTab('history');
        break;
      case 'profile':
        setSelectedTab('profile');
        break;
      default:
        setSelectedTab('home');
    }
  }, [segments]);

  const handleTabPress = (tab, route) => {
    setSelectedTab(tab);
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress('home', '/dashboard')}
      >
        <FontAwesome name="home" size={20} color={selectedTab === 'home' ? 'orange' : 'white'} />
        <Text style={[styles.tabText, selectedTab === 'home' && styles.selectedText]}>Home</Text>
      </TouchableOpacity>

      {/* Upload Video */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress('upload', '/upload-video')}
      >
        <FontAwesome name="upload" size={20} color={selectedTab === 'upload' ? 'orange' : 'white'} />
        <Text style={[styles.tabText, selectedTab === 'upload' && styles.selectedText]}>Upload</Text>
      </TouchableOpacity>

      {/* History */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress('history', '/video-list')}
      >
        <FontAwesome name="history" size={20} color={selectedTab === 'history' ? 'orange' : 'white'} />
        <Text style={[styles.tabText, selectedTab === 'history' && styles.selectedText]}>History</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress('profile', '/profile')}
      >
        <FontAwesome name="user" size={20} color={selectedTab === 'profile' ? 'orange' : 'white'} />
        <Text style={[styles.tabText, selectedTab === 'profile' && styles.selectedText]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
