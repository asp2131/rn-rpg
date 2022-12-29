import React, { useState, useRef } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import { Canvas, Path } from '@shopify/react-native-skia'
import {
  BrushProperties,
  CanvasControls,
  DrawingTool,
} from '@benjeau/react-native-draw-extras'
import { runOnJS } from 'react-native-reanimated'

export default function Draw() {
  const [paths, setPaths] = useState([])
  const [color, setColor] = useState('#06d6a0')
  const [thickness, setThickness] = useState(5)
  const [opacity, setOpacity] = useState(1)
  const [tool, setTool] = useState(DrawingTool.Brush)
  const [visibleBrushProperties, setVisibleBrushProperties] = useState(false)
  const canvasRef = useRef(null)

  const handleUndo = () => {
    const copyOfPaths = paths.slice()
    copyOfPaths.pop()
    setPaths(copyOfPaths)
  }

  const handleClear = () => {
    setPaths([])
  }

  const handleToggleEraser = () => {
    setTool((prev) =>
      prev === DrawingTool.Brush ? DrawingTool.Eraser : DrawingTool.Brush
    )
  }

  const [overlayOpacity] = useState(new Animated.Value(0))
  const handleToggleBrushProperties = () => {
    if (!visibleBrushProperties) {
      setVisibleBrushProperties(true)

      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setVisibleBrushProperties(false)
      })
    }
  }

  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths]
      newPaths[paths.length] = {
        segments: [],
        color: '#06d6a0',
      }
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`)
      runOnJS(setPaths)(newPaths)
    })
    .onUpdate((g) => {
      const index = paths.length - 1
      const newPaths = [...paths]
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`)
        runOnJS(setPaths)(newPaths)
      }
    })
    .minDistance(1)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, backgroundColor: 'antiquewhite' }}>
          <Canvas canvasRef={canvasRef} style={{ flex: 8 }}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(' ')}
                strokeWidth={thickness}
                style="stroke"
                color={color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
      <View>
        <CanvasControls
          onUndo={handleUndo}
          onClear={handleClear}
          onToggleBrushProperties={handleToggleBrushProperties}
          tool={tool}
          color={color}
          opacity={opacity}
          thickness={thickness}
        />
        {visibleBrushProperties && (
          <BrushProperties
            color={color}
            thickness={thickness}
            opacity={opacity}
            onColorChange={setColor}
            onThicknessChange={setThickness}
            onOpacityChange={setOpacity}
            style={{
              position: 'absolute',
              bottom: 80,
              left: 0,
              right: 0,
              padding: 10,
              backgroundColor: '#f2f2f2',
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              borderWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: 0,
              borderTopColor: '#ccc',
              opacity: overlayOpacity,
            }}
          />
        )}
      </View>
    </GestureHandlerRootView>
  )
}
