import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./dashboard.style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const router = useRouter();
  // const [token, setToken] = useState("");

  useEffect(() => {

      getDashboardData();
  
  }, []);

  const getDashboardData = async () => {
    try {
      const token =  await AsyncStorage.getItem('token');

      const response = await fetch('http://192.168.0.150:5000/video/dashboard/main', {
        headers: {
          Authorization: token,
        },
      });

     // console.log( await response.json())
      const data = await response.json();
   
     console.log(data)

      // Transform API data into the desired format
      const transformedRecentVideos = data.data.recentVideos.map((video) => {
        return {
          id: video._id,
          fileName: video.filename,
          thumbnail: video.filepath.replace('.mp4', '-thumbnail.jpg'), // Assuming thumbnails follow this naming convention
          status: video.status,
          icon: 'checkmark-circle',
        };
      });

      setDashboardData({
        likelyDeepfakeCount: data.data.likelyDeepfakeCount,
        genuineCount: data.data.genuineCount,
        recentActivities: transformedRecentVideos,
      });
      console.log(recentActivities)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTabPress = (route) => {
    router.push(route);
  };

  if (!dashboardData) {
    return <Text>Loading...</Text>;
  }

  const { likelyDeepfakeCount, genuineCount, recentActivities } = dashboardData;

  return (
    <View style={styles.container}>
      <View style={styles.summarycontainer}>
        <View style={styles.deepfakeCard}>
          <Text style={styles.cardValue}>{likelyDeepfakeCount}</Text>
          <Text style={styles.cardTitle}>Likely Deepfake</Text>
        </View>

        <View style={[styles.card, styles.genuineCard]}>
          <Text style={styles.cardValue}>{genuineCount}</Text>
          <Text style={styles.cardTitle}>Genuine Footage</Text>
        </View>
      </View>

      <View style={styles.recentActivities}>
        <Text style={styles.recentActivitiesLabel}>Recent activities</Text>
        <TouchableOpacity onPress={() => handleTabPress('/video-list')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {recentActivities.map((activity) => (
        <TouchableOpacity
          key={activity.id}
          style={styles.activityBox}
        >
          <Ionicons name="videocam" size={24} color="gray" />
          <View style={styles.fileDetailsContainer}>
            <Text style={styles.fileName}>{activity.fileName}</Text>
            <Text style={styles.statusText}>{activity.status}</Text>
          </View>
          <Ionicons name={activity.icon} size={24} color={activity.status === 'Completed' ? 'green' : 'orange'} />
        </TouchableOpacity>
      ))}
    </View>
  );
};



export default Dashboard;
