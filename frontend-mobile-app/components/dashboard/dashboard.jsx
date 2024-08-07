import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "./dashboard.style";
import { useRouter } from 'expo-router';


const Dashboard = () => {
const router = useRouter();
  const recentActivities = [
    { id: 1, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 2, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' },
    { id: 3, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 4, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' },
    { id: 5, fileName: 'AI_Video.MP4', icon: 'checkmark-circle' },
    { id: 6, fileName: 'Deepfake.MP4', icon: 'checkmark-circle' }
  ];
  const handleTabPress = ( route) => {
   
    router.push(route);
  };

  return (
    <View style={styles.container}>
        
        <View style={styles.summarycontainer}>
            <View style={styles.deepfakeCard}>
                <Text style={styles.cardValue}>78</Text>
                <Text style={styles.cardTitle}>Likely Deepfake</Text>
            </View>

        
            <View style={[styles.card, styles.genuineCard]}>
                <Text style={styles.cardValue}>89</Text>
                <Text style={styles.cardTitle}>Genuine Footage</Text>
            </View>
        </View>

        <View style={styles.recentActivities}>
                <Text style={styles.recentActivitiesLabel}>Recent activities</Text>
                <TouchableOpacity  onPress={() => handleTabPress('/video-list')}>
                <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
        
        </View>
        {recentActivities.map((activity) => (
        <View key={activity.id} style={styles.activityBox}>
          <Ionicons name="videocam" size={24} color="gray" />
          <Text style={styles.fileName}>{activity.fileName}</Text>
          <Ionicons name={activity.icon} size={24} color="green" />
        </View>
      ))}
    </View>
  );
};

export default Dashboard;
