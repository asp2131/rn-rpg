/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, useState, useRef, useEffect } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native'
import sample from 'lodash.sample'

import AnimatedSprite from '@asp2131/rn-anime-sprite'
import owlguySprite from './sprites/owlguy/owlguySprite'
import { Motion } from '@legendapp/motion'
import { MotiView } from 'moti'

export default function AnimatedSpriteExample({ isAttacking = false }) {
  const [animationType, setAnimationType] = useState('WALK')
  const [tweenOptions, setTweenOptions] = useState({})
  const [isWalking, setIsWalking] = useState(false)
  const [direction, setDirection] = useState(1)
  const [horizontal, setHorizontal] = useState(-150)
  const enemyRef = useRef(null)

  useEffect(() => {
    // setTimeout(() => {
    //   direction === 1 ? setDirection(-1) : setDirection(1)
    // }, 3500)
  }, [direction])

  const onPress = () => {
    const animation = sample(owlguySprite.animationTypes)
    console.log('enemy animation') // eslint-disable-line no-console
  }

  const tweenSprite = () => {
    // const coords = enemyRef.getCoordinates()
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
    <MotiView
      from={{
        translateX: 400,
      }}
      animate={{
        translateX: 0,
      }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 4500,
        delay: 100,
      }}
      style={{
        zIndex: 2,
      }}
      onPress={() => {
        console.log('enemy pressed') // eslint-disable-line no-console
      }}
    >
      <AnimatedSprite
        ref={enemyRef}
        sprite={owlguySprite}
        loopAnimation={true}
        animationFrameIndex={owlguySprite.animationIndex(animationType)}
        coordinates={{
          top: -400,
          left: horizontal,
        }}
        size={{
          width: owlguySprite.size.width * 1.25,
          height: owlguySprite.size.height * 1.25,
        }}
        draggable={true}
        tweenOptions={tweenOptions}
        direction={direction}
        tweenStart={'fromMethod'}
        onPress={() => {
          onPress()
          //   tweenSprite()
        }}
      />
    </MotiView>
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
