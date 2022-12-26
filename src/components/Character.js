import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Animated } from 'react-native'
import Sprite from './SpriteSheet'

function GameObject({ x, y, isMoving }) {
  const position = useState(new Animated.ValueXY({ x, y }))[0]

  useEffect(() => {
    Animated.timing(position, {
      toValue: { x, y },
      duration: 1000,
      useNativeDriver: true, // Add This line
    }).start()
  }, [x, y])

  return (
    <Animated.View style={[styles.object, position.getTranslateTransform()]}>
      {/* <Image source={require('../../assets/mario.png')} style={styles.image} /> */}
      <Sprite isMoving={isMoving} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  object: {
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
})

export default GameObject
