import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAFBFF',
    padding: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  uploadBox: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    position: 'relative',
    height: width * 1.18, // Aspect ratio 16:9
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10, // Ensure the cancel button is above the video
  },
  uploadText: {
    fontSize: 16,
    color: 'gray',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  uploadButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  recentStatusText: {
    fontSize: 14,
    color: 'orange',
  },
  suggestionsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    top: 70, // Adjust based on your layout
    zIndex: 10,
  },
  suggestionItem: {
    padding: 10,
    fontSize: 16,
  },
});

export default styles;
