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
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
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
  fileDetailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  fileName: {
    fontSize: 16,
    color: '#222222',
  },
  statusText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default styles;
