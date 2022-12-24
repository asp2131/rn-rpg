import React, { useRef, useState } from 'react'
import { View, StyleSheet, PanResponder, Animated } from 'react-native'

const AnalogStick = ({
  stickPosition,
  setStickPosition,
  moveCharacter,
  setIsMoving,
}) => {
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5
      },
      onPanResponderMove: (evt, gestureState) => {
        // Update the position of the stick based on the gesture data
        const { dx, dy } = gestureState
        moveCharacter(dx, dy)
        setStickPosition({ x: dx, y: dy })
      },
      onPanResponderRelease: () => {
        setIsMoving(false)
        // Reset the position of the stick when the user releases it
        setStickPosition({ x: 0, y: 0 })
      },
    })
  ).current

  const stickStyle = {
    transform: [
      {
        translateX: stickPosition.x,
      },
      {
        translateY: stickPosition.y,
      },
    ],
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={[styles.stick, stickStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stick: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
  },
})

export default AnalogStick
