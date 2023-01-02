import React, { useEffect, useState, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Landing from './src/screens/Landing'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  Animated,
  PanResponder,
  TouchableHighlight,
} from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import LottieView from 'lottie-react-native'
import Character from './src/components/Character'
import Modal from './src/components/Modal'
import Trace from './src/screens/Trace'
import * as Speech from 'expo-speech'
import Camera from './src/screens/AICamera'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

function App({ navigation }) {
  const [movementPosition, setMovementPosition] = useState({ x: 0, y: 0 })
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [objectName, setObjectName] = useState('')
  const [showScreen1, setShowScreen1] = useState(true)
  const [playground, setPlayground] = useState('bg1')
  const [showScreen2, setShowScreen2] = useState(false)
  const [side, setSide] = useState('middle')
  const transition = useRef(new Animated.Value(0)).current
  const painter = useRef(null)
  const camera_buddy = useRef(null)
  const pan = useRef(new Animated.ValueXY()).current

  useEffect(() => {
    // showScreen1 ? painter.current.play() : null
    // changeScreenOrientation()
  }, [movementPosition, isMoving])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderStart: (e, gestureState) => {
        moveCharacter(gestureState.x0, gestureState.y0)
      },
      onPanResponderEnd: (e, gestureState) => {
        moveCharacter(gestureState.x0, gestureState.y0)
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        })
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event, gestureState) => {
        // pan.flattenOffset()
        // console.log(event.nativeEvent.locationX)
        // console.log(event.nativeEvent.locationY)
      },
    })
  ).current

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    )
  }

  const moveCharacter = (analogX, analogY) => {
    setIsMoving(true)
    // console.log(analogX - 300, analogY - 300)
    // console.log('analogX', analogX)
    const adjustedX = analogX - 330
    const adjustedY = analogY - 360

    analogY -= 300
    analogX -= 150
    console.log('analogX', analogX)
    // console.log('analogY', analogY)

    if (
      analogX >= -139 &&
      analogX <= -51 &&
      analogY >= 208 &&
      analogY <= 360 &&
      playground === 'bg1'
    ) {
      setObjectName('Tree')
      // Speech.speak('Tree')
      // setModalVisible(true)
    } else if (
      analogX >= 50 &&
      analogX <= 95 &&
      analogY >= 32 &&
      analogY <= 1114 &&
      playground === 'bg1'
    ) {
      setObjectName('Train')
      // Speech.speak('Train')
      // setModalVisible(true)
    } else if (playground === 'bg1' && side === 'right' && analogX < 0) {
      console.log('Go to middle')
      Animated.timing(transition, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: true,
      }).start()
      setSide('middle')
      // Speech.speak('Woo hoo')
      // setPlayground('bg1')
      // setShowScreen1(true)
    } else if (playground === 'bg1' && side === 'middle' && analogX > 160) {
      Animated.timing(transition, {
        toValue: -100,
        duration: 2000,
        useNativeDriver: true,
      }).start()
      setSide('right')
      // Speech.speak('Here we go')
      // setPlayground('bg2')
      // setShowScreen1(false)
      // navigation.navigate('Trace')
    } else if (playground === 'bg1' && side === 'middle' && analogX < -100) {
      Animated.timing(transition, {
        toValue: 100,
        duration: 2000,
        useNativeDriver: true,
      }).start()
      setSide('middle')
      // Speech.speak('Woo hoo')
      // setPlayground('bg3')
      // setShowScreen1(false)
      // setShowScreen2(true)
    } else if (playground === 'bg3' && analogX > 230) {
      // Speech.speak('Woo hoo')
      // setPlayground('bg1')
      // setShowScreen1(true)
      // setShowScreen2(false)
    } else {
      setModalVisible(false)
    }

    //e.nativeEvent.locationX
    //Move character based on analog stick position
    setCharacterPosition({
      x: analogX,
      y: analogY,
    })

    setTimeout(() => {
      setIsMoving(false)
    }, 800)
  }

  return (
    <View
      // onTouchStart={(e) =>
      //   moveCharacter(e.nativeEvent.locationX, e.nativeEvent.locationY)
      // }
      style={styles.container}
      {...panResponder.panHandlers}
    >
      <>
        {showScreen1 ? (
          <>
            <Animated.Image
              source={require('./assets/bg4.png')}
              style={
                (styles.image,
                {
                  transform: [{ translateX: transition }],
                })
              }
            />
          </>
        ) : showScreen2 ? (
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
        <Animated.View
          style={{
            transform: [{ translateX: transition }],
          }}
        >
          <></>
        </Animated.View>
      ) : null}
      {showScreen2 ? (
        <Pressable onPress={() => navigation.navigate('Camera')}>
          <LottieView
            autoPlay
            ref={camera_buddy}
            style={{
              width: 150,
              height: 150,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('./assets/camera_buddy.json')}
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
      <Stack.Navigator
        screenOptions={{ gestureEnabled: true }}
        initialRouteName="Landing"
      >
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={App}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'antiquewhite',
            },
          }}
          name="Trace"
        >
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
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgb(245, 252, 255)',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
