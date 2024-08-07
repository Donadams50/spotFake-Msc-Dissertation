// ModalMessage.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const ModalMessage = ({ visible, message, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
        <Text>{message}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ModalMessage;
