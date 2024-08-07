import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
    padding: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 50, // Make it the same height as the video items
  },
  input: {
    flex: 1,
    height: 50, // Match the height of the container
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  activityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  fileName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222222',
  },
});

export default styles;
