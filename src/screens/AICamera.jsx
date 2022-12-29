import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {
  Camera,
  useFrameProcessor,
  useCameraDevices,
} from 'react-native-vision-camera'
import { labelImage } from 'vision-camera-image-labeler'
import { runOnJS } from 'react-native-reanimated'
import CameraSprite from '../components/CameraSprite'
import * as Speech from 'expo-speech'
import { Button, Icon, Div } from 'react-native-magnus'

const AICamera = ({ cameraProps }) => {
  const [value, setValue] = useState('')

  const getPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission()
  }

  const sayText = () => {
    if (value === '') return
    Speech.speak(value)
  }

  useEffect(() => {
    getPermission()
  }, [])

  const devices = useCameraDevices('wide-angle-camera')
  const device = devices.back
  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet'
      const labels = labelImage(frame)
      runOnJS(setValue)(labels[0]?.label)
      console.log('Labels:', labels[0]?.label)
    },
    [value]
  )

  if (device == null)
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(245, 252, 255)' }}>
        <Image
          style={{ width: 350, height: 350, left: -50, top: 100 }}
          source={require('../../assets/camperm.png')}
        />
        <CameraSprite sayText={sayText} />
      </View>
    )

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={3}
      />
      <Text style={{ backgroundColor: 'black', fontSize: 20, color: 'white' }}>
        {value}
      </Text>
      <Button
        mt="lg"
        ml="md"
        px="xl"
        py="lg"
        bg="blue500"
        rounded="circle"
        color="white"
        shadow={2}
        onPress={sayText}
        prefix={<Icon name="caretright" mr="sm" color="white" />}
      >
        Play now
      </Button>
    </>
  )
}

export default AICamera
