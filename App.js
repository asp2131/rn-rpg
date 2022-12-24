import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import Forest from './assets/trees.svg'
import AxisPad from './src/components/Axis'
import { Motion } from '@legendapp/motion'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function App() {
  const [value, setValue] = useState(0)
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 })
  const [movementPosition, setMovementPosition] = useState({ x: 0, y: 0 })
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    changeScreenOrientation()
    console.log('isMoving', isMoving)
    // console.log('movementPosition', movementPosition)
    if (
      movementPosition.x > 0 &&
      movementPosition.y < 50 &&
      movementPosition.y > -50
    ) {
      const x = characterPosition.x + 2.5
      setCharacterPosition({ x: x, y: characterPosition.y })
    }
    if (
      movementPosition.x < 0 &&
      movementPosition.y < 50 &&
      movementPosition.y > -50
    ) {
      const x = characterPosition.x - 2.5
      setCharacterPosition({ x, y: characterPosition.y })
    }
    if (movementPosition.y > 50) {
      const y = characterPosition.y + 2.5
      setCharacterPosition({ x: characterPosition.x, y })
    }
    if (movementPosition.y < -50) {
      const y = characterPosition.y - 2.5
      setCharacterPosition({ x: characterPosition.x, y })
    }
  }, [movementPosition, isMoving])

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    )
  }

  const moveCharacter = (analogX, analogY) => {
    setIsMoving(true)
    // const x = characterPosition.x + analogX
    // const y = characterPosition.y + analogY
    setMovementPosition({ x: analogX, y: analogY })
  }

  return (
    <View style={styles.container}>
      {/* <Forest width={width} height={height} /> */}
      {/* Position Axis pad to left corner of screen */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}
      >
        {/* <Motion.View
          style={{ width: 50, height: 50, backgroundColor: 'red' }}
          initial={{ y: -50 }}
          animate={{ x: characterPosition.x, y: characterPosition.y }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ y: 20 }}
          transition={{ type: 'spring' }}
        /> */}
        <AxisPad
          setIsMoving={setIsMoving}
          moveCharacter={moveCharacter}
          stickPosition={stickPosition}
          setStickPosition={setStickPosition}
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
})
