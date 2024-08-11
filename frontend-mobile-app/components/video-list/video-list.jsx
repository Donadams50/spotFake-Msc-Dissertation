import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from './video-list.style';

const VideoList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videosData, setVideosData] = useState([]);

  const router = useRouter();


  useEffect(() => {

    getVideosData();

}, []);

const getVideosData = async () => {
  try {
    const token =  await AsyncStorage.getItem('token');
    const userId =  await AsyncStorage.getItem('userId');

    const response = await fetch(`http://192.168.0.150:5000/video/user/${userId}`, {
      headers: {
        Authorization: token,
      },
    });

   // console.log( await response.json())
    const data = await response.json();
 
   console.log(data)

    // Transform API data into the desired format
    const transformedRecentVideos = data.data.map((video) => {
      return {
        id: video._id,
        fileName: video.filename,
        status: video.status,
        icon: 'checkmark-circle',
      };
    });

    setVideosData(transformedRecentVideos);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const handleVideoPress = async (videoDetails) => {
    // Navigate to VideoAnalysis screen with video details
    console.log(videoDetails.id)
    await AsyncStorage.setItem('videoId', videoDetails.id);
    router.push('/video-details');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={24} color="gray" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search videos"
            keyboardType="default"
          />
        </View>
      </View>

      <ScrollView>
        {videosData.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityBox}
            onPress={() => handleVideoPress(activity)}
          >
            <Ionicons name="videocam" size={24} color="gray" />
            <View style={styles.fileDetailsContainer}>
              {/* All text content should be wrapped in <Text> */}
              <Text style={styles.fileName}>{activity.fileName}</Text>
              <Text style={styles.statusText}>{activity.status}</Text> 
            </View>
            <Ionicons name={activity.icon} size={24} color={activity.status === 'Completed' ? 'green' : 'orange'} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default VideoList;
