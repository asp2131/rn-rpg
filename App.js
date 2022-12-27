import React, { useEffect, useState, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import LottieView from 'lottie-react-native'
import Character from './src/components/Character'
import Modal from './src/components/Modal'
import Trace from './src/screens/Trace'
import * as Speech from 'expo-speech'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

function App({ navigation }) {
  const [value, setValue] = useState(0)
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 })
  const [movementPosition, setMovementPosition] = useState({ x: 0, y: 0 })
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [objectName, setObjectName] = useState('')
  const [showScreen1, setShowScreen1] = useState(true)
  const [playground, setPlayground] = useState('bg1')
  const animation = useRef(null)

  useEffect(() => {
    showScreen1 ? animation.current.play() : null
    // changeScreenOrientation()
    // console.log('isMoving', isMoving)
    // setCharacterPosition({ x: movementPosition.x, y: movementPosition.y })
    // console.log('movementPosition', movementPosition)
  }, [movementPosition, isMoving])

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    )
  }

  const moveCharacter = (analogX, analogY) => {
    setIsMoving(true)
    // console.log(analogX - 300, analogY - 300)
    const adjustedX = analogX - 300
    const adjustedY = analogY - 300

    if (
      adjustedX >= -139 &&
      adjustedX <= -51 &&
      adjustedY >= 208 &&
      adjustedY <= 360 &&
      playground === 'bg1'
    ) {
      setObjectName('Tree')
      // Speech.speak('Tree')
      // setModalVisible(true)
    } else if (
      adjustedX >= 50 &&
      adjustedX <= 95 &&
      adjustedY >= 32 &&
      adjustedY <= 1114 &&
      playground === 'bg1'
    ) {
      setObjectName('Train')
      // Speech.speak('Train')
      // setModalVisible(true)
    } else if (playground === 'bg1' && adjustedX > 238) {
      Speech.speak('Here we go')
      setPlayground('bg2')
      setShowScreen1(false)
      // navigation.navigate('Trace')
    } else if (playground === 'bg2' && adjustedX < -70) {
      Speech.speak('Woo hoo')
      setPlayground('bg1')
      setShowScreen1(true)
    } else {
      setModalVisible(false)
    }

    //e.nativeEvent.locationX
    //Move character based on analog stick position
    setCharacterPosition({
      x: adjustedX,
      y: adjustedY,
    })

    setTimeout(() => {
      setIsMoving(false)
    }, 800)
  }

  return (
    <View
      onTouchStart={(e) =>
        moveCharacter(e.nativeEvent.locationX, e.nativeEvent.locationY)
      }
      style={styles.container}
    >
      <>
        {showScreen1 ? (
          <>
            <Image source={require('./assets/bg5.png')} style={styles.image} />
          </>
        ) : (
          <>
            <Image source={require('./assets/bg6.png')} style={styles.image} />
          </>
        )}
      </>
      {showScreen1 ? (
        <Pressable onPress={() => navigation.navigate('Trace')}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 150,
              height: 150,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('./assets/woman_painting.json')}
          />
        </Pressable>
      ) : null}
      <Character
        isMoving={isMoving}
        x={characterPosition.x}
        y={characterPosition.y}
      />
      {/* <Forest width={width} height={height} /> */}
      {/* Position Axis pad to left corner of screen */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}
      >
        <Modal
          objectName={objectName}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 2,
    height: height * 1.2,
    position: 'absolute',
    zIndex: 0,
    // aspectRatio: 6,
    // width: null,
  },
  screen1: {
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 0,
  },
  screen2: {
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 0,
  },
})

const Stack = createStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={App}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Trace">
          {(props) => (
            <Trace
              {...props}
              letter="A"
              path="M 10 80 L 90 80 L 50 10 L 10 80"
              strokeWidth={2}
              strokeColor="black"
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
