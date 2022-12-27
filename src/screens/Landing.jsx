//create a lading ui for the game
import React, { useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native'
import LottieView from 'lottie-react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Landing = ({ navigation }) => {
  const animation = useRef(null)

  const playAnimation = () => {
    animation.current.play()
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      {/* <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
        /> */}
      <Image source={require('../../assets/bg5.png')} style={styles.image} />
      {/* <Text style={styles.title}>React Native Game</Text> */}
      <View style={{ marginTop: 30 }}>
        <Pressable style={styles.button} onPress={playAnimation}>
          <LottieView
            ref={animation}
            style={{
              width: 100,
              height: 100,
            }}
            source={require('../../assets/start.json')}
          ></LottieView>
        </Pressable>
      </View>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  image: {
    position: 'absolute',
    //show more the right side of the image
    // aspectRatio: 6,
    // width: null,
    left: -width / 2.5,
  },
})
