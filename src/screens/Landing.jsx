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
import { Button, Icon, Div } from 'react-native-magnus'
import LandingSprite from '../components/LandingSprite'
import Clickhere from '../../assets/Clickhere.svg'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Landing = ({ navigation }) => {
  const animation = useRef(null)

  const playAnimation = () => {
    // animation.current.play()
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Clickhere width={100} height={100} />
      </View>
      {/* <Text style={styles.title}>React Native Game</Text> */}
      <LandingSprite />
      <View style={{ marginBottom: 200 }}>
        <Button
          onPress={playAnimation}
          ml="md"
          px="xl"
          py="lg"
          fontWeight="bold"
          bg="blue500"
          rounded="circle"
          color="white"
          shadow={2}
          prefix={<Icon name="user" mr="sm" color="white" />}
        >
          Login with Email
        </Button>
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
    backgroundColor: 'rgb(245, 252, 255)',
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
    aspectRatio: 6,
    // width: null,
    top: 50,
  },
})
