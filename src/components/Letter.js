import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { Svg, Circle, G, Animate } from 'react-native-svg'

const createDotsForLetter = (letter) => {
  // create an array of dots for the given letter
  // this is just an example, you will need to implement this function
  // to return the correct dots for the letter you want to display
  return [
    { x: 10, y: 10 },
    { x: 20, y: 20 },
    { x: 30, y: 30 },
  ]
}

const DottedLetter = ({ letter }) => {
  const [showDots, setShowDots] = useState(false)

  // create an array of dots for the given letter
  const dots = createDotsForLetter(letter)

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%">
        {dots.map((dot, index) => (
          <G key={index}>
            <Animate
              attributeName="opacity"
              from={0}
              to={1}
              begin={index * 100}
              dur="500ms"
              fill="freeze"
            >
              <Circle
                cx={dot.x}
                cy={dot.y}
                r={5}
                stroke="#000"
                strokeWidth={2}
                fill={showDots ? '#000' : 'none'}
              />
            </Animate>
          </G>
        ))}
      </Svg>
      <Button onPress={() => setShowDots(!showDots)} title="Toggle Dots" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default DottedLetter
