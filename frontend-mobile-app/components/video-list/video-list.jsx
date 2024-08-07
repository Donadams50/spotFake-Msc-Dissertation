import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./video-list.style";

const VideoList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const recentActivities = [
    { id: 1, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 2, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' },
    { id: 3, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 4, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' },
    { id: 5, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 6, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' },
    { id: 7, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 8, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' },
    { id: 9, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 10, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' },
    { id: 11, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 12, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' }
  ];


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
        {recentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityBox}>
            <Ionicons name="videocam" size={24} color="gray" />
            <Text style={styles.fileName}>{activity.fileName}</Text>
            <Ionicons name={activity.icon} size={24} color="green" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default VideoList;
