import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Share } from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as Progress from 'react-native-progress';
import styles from './video-details.style';

const VideoAnalysis = () => {

  useEffect(() => {

    getVideosDetails();

}, []);

const [analysisData, setAnalysisData] = useState({})
const [videoDetails, setVideosDetails] = useState({})

const getVideosDetails = async () => {
  try {
    const token =  await AsyncStorage.getItem('token');
    const videoId =  await AsyncStorage.getItem('videoId');

    const response = await fetch(`http://192.168.0.150:5000/video/${videoId}`, {
      headers: {
        Authorization: token,
      },
    });

   // console.log( await response.json())
    const data = await response.json();
    console.log("videoId")
   console.log(data.data)

    // Transform API data into the desired format
    const transformedVideo =  {
        id: data.data._id,
        videoUrl: data.data.filepath,
        title: data.data.filename,
    duration: data.data.durationSec, // minutes
    frameRate: data.data.frameRate, // fps
    dateUploaded: data.data.createdAt,
    width: data.data.resolutionWidth,
    height: data.data.resolutionHeight,
    perceivedLocation: data.data.metadata.perceivedLocation,
    detectedLocation: data.data.metadata.detectedLocation,
    cameraUsed: data.data.metadata.cameraModel,
    confidenceLevel: data.data.metadata.confidenceScore, 
      };
    setVideosDetails(transformedVideo);
    console.log("yes")
    console.log(videoDetails)
    setAnalysisData({ detectedLocation: data.data.metadata.detectedLocation,
      likelyDeepFake: data.data.metadata.likelyDeepFake,
      analysisStatus: data.data.metadata.status,
      distance: data.data.metadata.diffInLocation })
 
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};




  const [controlsVisible, setControlsVisible] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  // const videoHeight = screenWidth * (9 / 16); // 16:9 aspect ratio
  const videoHeight = screenWidth  // 16:9 aspect ratio


  const toggleControls = () => setControlsVisible(!controlsVisible);

  const shareReport = async () => {
    try {
      const result = await Share.share({
        message: `Video Report for ${videoDetails.title}:\n- Duration: ${videoDetails.duration} minutes\n- Confidence Level: ${videoDetails.confidenceLevel}%\n- Perceived Location: ${videoDetails.perceivedLocation}\n- Detected Location: ${analysisData.detectedLocation}\n- Likely DeepFake: ${analysisData.likelyDeepFake ? 'Yes' : 'No'}\n- Analysis Status: ${analysisData.analysisStatus}`,
      });
      if (result.action === Share.sharedAction) {
        console.log('Report shared');
      } else if (result.action === Share.dismissedAction) {
        console.log('Report dismissed');
      }
    } catch (error) {
      console.error('Error sharing report:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={toggleControls}>
        <Video
          source={{ uri: videoDetails.videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover" // Ensures full width without cropping
          shouldPlay={false}
          isLooping
          useNativeControls={controlsVisible} // Toggle video controls visibility
          style={[styles.video, { width: screenWidth, height: videoHeight }]}
        />
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{videoDetails.title}</Text>
           <Text style={styles.confidenceScore}>{videoDetails.confidenceLevel}%</Text>
        </View>
        <Text style={styles.detailLabel}>Duration: <Text style={styles.detailValue}>{videoDetails.duration} seconds</Text></Text>
        <Text style={styles.detailLabel}>Frame Rate: <Text style={styles.detailValue}>{videoDetails.frameRate} fps</Text></Text>
        <Text style={styles.detailLabel}>Date Uploaded: <Text style={styles.detailValue}>{videoDetails.dateUploaded}</Text></Text>
        <Text style={styles.detailLabel}>Width & Height: <Text style={styles.detailValue}>{videoDetails.width} x {videoDetails.height}</Text></Text>
        
        <View style={styles.metaDataContainer}>
          <Text style={styles.metaHeader}>Video MetaData</Text>
          <Text style={styles.detailLabel}>Perceived Location: <Text style={styles.detailValue}>{videoDetails.perceivedLocation}</Text></Text>
          <Text style={styles.detailLabel}>Detected Location: <Text style={styles.detailValue}>{analysisData.detectedLocation}</Text></Text>
          <Text style={styles.detailLabel}>Distance Variation: <Text style={styles.detailValue}>{analysisData.distance}</Text></Text>
          <Text style={styles.detailLabel}>Likely Deep Fake: <Text style={styles.detailValue}>{analysisData.likelyDeepFake ? 'Yes' : 'No'}</Text></Text>
          <Text style={styles.detailLabel}>Status of Analysis: <Text style={styles.detailValue}>{analysisData.analysisStatus}</Text></Text>
          <Text style={styles.detailLabel}>Camera Used: <Text style={styles.detailValue}>{videoDetails.cameraUsed}</Text></Text>
        </View>

        {/* Share Report Button */}
        <TouchableOpacity style={styles.shareButton} onPress={shareReport}>
          <Text style={styles.shareButtonText}>Share Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VideoAnalysis;
