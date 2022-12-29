/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, useState, useRef, useEffect } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
import sample from 'lodash.sample'

import AnimatedSprite from '@asp2131/rn-anime-sprite'
import monsterSprite from './sprites/monster/monsterSprite'

export default function AnimatedSpriteExample() {
  const [animationType, setAnimationType] = useState('EAT')
  const [tweenOptions, setTweenOptions] = useState({})
  const [isWalking, setIsWalking] = useState(false)
  const monsterRef = useRef(null)

  const onPress = () => {
    const animation = sample(monsterSprite.animationTypes)
    // console.log('animation', animation) // eslint-disable-line no-console
    if (animationType === 'IDLE') {
      setAnimationType('EAT')
    } else {
      setAnimationType('IDLE')
    }
  }

  const tweenSprite = () => {
    // const coords = monsterRef.getCoordinates()
    const location = [0, 100, 200, 300, 400, 500]
    setTweenOptions({
      tweenType: 'sine-wave',
      startXY: [100, 100],
      xTo: [sample(location), sample(location)],
      yTo: [sample(location), sample(location)],
      duration: 1000,
      loop: false,
    })
  }

  return (
    <View style={styles.container}>
      <AnimatedSprite
        ref={monsterRef}
        sprite={monsterSprite}
        loopAnimation={true}
        animationFrameIndex={monsterSprite.animationIndex(animationType)}
        coordinates={{
          top: 0,
          left: 170,
        }}
        size={{
          width: monsterSprite.size.width * 2.65,
          height: monsterSprite.size.height * 2.65,
        }}
        draggable={true}
        tweenOptions={tweenOptions}
        tweenStart={'fromMethod'}
        onPress={() => {
          onPress()
          //   tweenSprite()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
