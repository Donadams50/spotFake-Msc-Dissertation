import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: '25%', 
    width: '100%', 
    height: '25%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20, 
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default styles;
