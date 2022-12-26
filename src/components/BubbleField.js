import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'

const Bubble = ({ onPop }) => {
  const [position, setPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
  const [size, setSize] = useState(new Animated.Value(0))
  const [opacity, setOpacity] = useState(new Animated.Value(1))

  useEffect(() => {
    console.log(position)
    // Generate a random starting position and size for the bubble
    const x = Math.random() * 100
    const y = Math.random() * 100
    const s = Math.random() * 40 + 10
    setPosition(new Animated.ValueXY({ x, y }))
    setSize(new Animated.Value(s))

    // Set up a loop to move the bubble in a random direction
    const interval = setInterval(() => {
      const dx = (Math.random() - 0.5) * 2
      const dy = (Math.random() - 0.5) * 2
      setPosition(
        position.setValue({
          x: position.x._value + dx,
          y: position.y._value + dy,
        })
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const pop = () => {
    // Animate the bubble popping
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 250 }),
      Animated.timing(size, { toValue: 0, duration: 250 }),
    ]).start(onPop)
  }

  const bubbleStyles = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { scale: size },
    ],
    opacity,
  }

  return (
    <TouchableWithoutFeedback onPress={pop}>
      <Animated.View style={[styles.bubble, bubbleStyles]} />
    </TouchableWithoutFeedback>
  )
}

const App = () => {
  const [bubbles, setBubbles] = useState([])

  const addBubble = () => {
    setBubbles([...bubbles, { id: Math.random() }])
  }

  const removeBubble = (id) => {
    setBubbles(bubbles.filter((bubble) => bubble.id !== id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Touch the bubbles to pop them</Text>
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} onPop={() => removeBubble(bubble.id)} />
      ))}
      <TouchableWithoutFeedback onPress={addBubble}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </TouchableWithoutFeedback>
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
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  bubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightblue',
  },
  addButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
})

export default App
