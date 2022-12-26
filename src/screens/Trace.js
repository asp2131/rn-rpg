import React, { useRef, useState } from 'react'
import { View, StyleSheet, PanResponder, Animated } from 'react-native'
import * as SVG from 'react-native-svg'
import letterA from '../../assets/letterA.svg'

const TracingPath = ({ path, strokeWidth = 16, strokeColor = 'red' }) => {
  const pathRef = useRef(null)
  const [currentX, setCurrentX] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5
      },
      onPanResponderMove: (evt, gestureState) => {
        setCurrentX(gestureState.moveX)
        setCurrentY(gestureState.moveY)
      },
      onPanResponderRelease: (evt, gestureState) => {
        setCurrentX(0)
        setCurrentY(0)
      },
    })
  ).current

  const onLayout = () => {
    pathRef.current.measure((x, y, width, height, pageX, pageY) => {
      setPathBounds({ x: pageX, y: pageY, width, height })
    })
  }

  const [pathBounds, setPathBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <SVG.Svg width="100%" height="100%" onLayout={onLayout}>
        <SVG.Path
          ref={pathRef}
          d={letterA}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {currentX !== 0 && currentY !== 0 && (
          <Animated.View
            style={[
              styles.dot,
              {
                left: currentX - pathBounds.x - strokeWidth / 2,
                top: currentY - pathBounds.y - strokeWidth / 2,
              },
            ]}
          />
        )}
      </SVG.Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  dot: {
    backgroundColor: 'black',
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
  },
})

export default TracingPath
