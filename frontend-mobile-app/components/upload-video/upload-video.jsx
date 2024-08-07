import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import axios from 'axios';
import styles from './upload-video.style';
import ModalMessage from './ModalMessage';
import { useRouter } from 'expo-router';

const UploadVideo = () => {
  const [videoLocation, setVideoLocation] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDetails, setVideoDetails] = useState({});
  const [controlsVisible, setControlsVisible] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  const GOOGLE_API_KEY = process.env.googlekey;

  const handleSelectMedia = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { size, uri, name } = result.assets[0];
        const maxSize = 10 * 1024 * 1024; // 10 MB

        if (size <= maxSize) {
          setLoading(true);
          const formData = new FormData();
          formData.append('file', {
            uri: uri,
            type: 'video/mp4',
            name: name,
          });

          const response = await axios.post('http://192.168.0.150:5000/video/upload-storage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const { details } = response.data.data;
          console.log(details);
          setVideoUrl(details.url);
          setVideoDetails(details);
          setSelectedVideo(uri);
          await AsyncStorage.setItem('videoDetails', JSON.stringify(details));

          setControlsVisible(true); // Show controls immediately after upload
          setLoading(false);
        } else {
          Alert.alert('Error', 'The selected video file is larger than 10 MB.');
        }
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred while selecting or uploading the video file.');
    }
  };

  const handleUploadVideo = async () => {
    console.log('in submit video');

    const { url, frame_rate, duration, width, height, originalname } = videoDetails;
    const { longitude, latitude } = coordinates;

    // console.log(url, frame_rate, duration, width, height, originalname, longitude, latitude, videoLocation);

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      // console.log(userId);
      // console.log(token);

      const response = await axios.post('http://192.168.0.150:5000/video', {
        url,
        frame_rate,
        duration,
        width,
        height,
        originalname,
        longitude,
        latitude,
        videoLocation,
      }, {
        headers: {
          Authorization: token,
        },
      });
      console.log("i don reach")
      console.log(response)
      if (response.status === 201) {
        await AsyncStorage.removeItem('videoDetails');
        setSuccessModalVisible(true);
        setModalMessage('Video successfully submitted!');
        setTimeout(() => {
          setSuccessModalVisible(false);
          router.push('/video-history');
        }, 2000); // Delay for 2 seconds before navigating to the history page
      } else {
        console.log("fail")
        setErrorModalVisible(true);
        setModalMessage('Failed to submit video.');
      }
    } catch (error) {
      console.error('Error submitting video:', error);
      setErrorModalVisible(true);
      setModalMessage('Server error. Please try again later.');
    }
  };

  const handleRemoveVideo = async () => {
    setSelectedVideo(null);
    setVideoUrl('');
    await AsyncStorage.removeItem('videoDetails');
  };

  const handleToggleControls = () => {
    setControlsVisible(!controlsVisible);
  };

  const fetchSuggestions = async (query) => {
    if (query.length > 2) { // Start fetching suggestions after 3 characters
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
          params: {
            input: query,
            key: GOOGLE_API_KEY,
            types: 'geocode',
          }
        });
        setSuggestions(response.data.predictions);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch location suggestions.');
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: placeId,
          key: GOOGLE_API_KEY,
        }
      });
      const { lat, lng } = response.data.result.geometry.location;
      setCoordinates({ latitude: lat, longitude: lng });
      Alert.alert('Location Coordinates', `Latitude: ${lat}, Longitude: ${lng}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch place details.');
    }
  };

  const handleSelectSuggestion = (place) => {
    setVideoLocation(place.description);
    setSuggestions([]);
    fetchPlaceDetails(place.place_id);
  };

  // useEffect to hide controls after 5 seconds
  useEffect(() => {
    if (selectedVideo) {
      const timer = setTimeout(() => {
        setControlsVisible(false);
      }, 5000); // Hide controls after 5 seconds

      return () => clearTimeout(timer); // Cleanup on unmount or when selectedVideo changes
    }
  }, [selectedVideo]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={videoLocation}
        onChangeText={(text) => {
          setVideoLocation(text);
          fetchSuggestions(text);
        }}
        placeholder="Enter perceived Video Location"
        placeholderTextColor="gray"
      />

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
              <Text style={styles.suggestionItem}>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}

      <TouchableOpacity
        style={styles.uploadBox}
        onPress={handleSelectMedia}
        disabled={!!selectedVideo || loading}
      >
        {selectedVideo ? (
          <>
            <TouchableOpacity
              style={styles.videoContainer}
              onPress={handleToggleControls}
              activeOpacity={1}
            >
              <Video
                ref={videoRef}
                source={{ uri: selectedVideo }}
                style={styles.video}
                resizeMode="cover"
                shouldPlay={false}
                useNativeControls={controlsVisible}
                isLooping
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleRemoveVideo}
            >
              <Ionicons name="close-circle" size={40} color="red" />
            </TouchableOpacity>
          </>
        ) : (
          loading ? (
            <ActivityIndicator size="large" color="#2D1461" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={50} color="gray" />
              <Text style={styles.uploadText}>Select Media file to upload</Text>
            </>
          )
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.uploadButton, { backgroundColor: videoUrl ? '#3D1E6D' : 'gray' }]} 
        onPress={handleUploadVideo}
        disabled={!videoUrl}
      >
        <Text style={styles.uploadButtonText}>Submit Video for analysis</Text>
      </TouchableOpacity>

      <ModalMessage
        visible={errorModalVisible || successModalVisible}
        message={modalMessage}
        onClose={() => {
          setErrorModalVisible(false);
          setSuccessModalVisible(false);
        }}
      />
    </View>
  );
};

export default UploadVideo;
