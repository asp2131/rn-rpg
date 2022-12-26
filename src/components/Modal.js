import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
} from 'react-native'

const App = ({ modalVisible, setModalVisible, objectName }) => {
  const toggleModal = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Types.easeInEaseOut)
    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={toggleModal}>
        <Text>Toggle Modal</Text>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <Text>{objectName}</Text>
            {/* <TouchableOpacity onPress={toggleModal}>
              <Text>Close Modal</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    padding: 22,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
})

export default App
