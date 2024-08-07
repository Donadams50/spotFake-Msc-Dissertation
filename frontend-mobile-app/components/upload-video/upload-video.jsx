import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert ,FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import axios from 'axios';
import styles from './upload-video.style';

const UploadVideo = () => {
  const [videoLocation, setVideoLocation] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const videoRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const handleSelectMedia = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { size, uri } = result.assets[0];
        const maxSize = 10 * 1024 * 1024; 

        if (size <= maxSize) {
          setSelectedVideo(uri);
          await AsyncStorage.setItem('selectedVideo', uri);
          setControlsVisible(true); // Show controls immediately after upload
        } else {
          Alert.alert('Error', 'The selected video file is larger than 10 MB.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while selecting the video file.');
    }
  };

  const handleUploadVideo = () => {
    // Logic to upload video
    Alert.alert('Upload', 'Video uploaded successfully.');
  };



  const handleRemoveVideo = async () => {
    setSelectedVideo(null);
    await AsyncStorage.removeItem('selectedVideo');
  };

  const handleToggleControls = () => {
    setControlsVisible(!controlsVisible);
  };



  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

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

{/* <TextInput
        style={styles.input}
        value={videoLocation}
        onChangeText={setVideoLocation}
        placeholder="Enter Video Location"
        placeholderTextColor="gray"
      /> */}

<TextInput
        style={styles.input}
        value={videoLocation}
        onChangeText={(text) => {
          setVideoLocation(text);
          fetchSuggestions(text);
        }}
        placeholder="Enter percieved Video Location"
        placeholderTextColor="gray"
      />

      {/* Display suggestions */}
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
        disabled={!!selectedVideo}
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
          <>
            <Ionicons name="cloud-upload-outline" size={50} color="gray" />
            <Text style={styles.uploadText}>Select Media file to upload</Text>
          </>
        )}
      </TouchableOpacity>

    

      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
        <Text style={styles.uploadButtonText}>Upload Video</Text>
      </TouchableOpacity>

    
    </View>
  );
};

export default UploadVideo;
