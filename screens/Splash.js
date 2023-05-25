import React, {Component} from 'react';
import {
  
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ImageBackground,
  Dimensions,
  BackHandler,
  AppState,
  PermissionsAndroid,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import TouchID from 'react-native-touch-id';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touchhh: false,
      visible: false,
      spinner: true,
      // appState:AppState.currentState
    };
  }

  componentDidMount = async () => {
    let user = await AsyncStorage.getItem('user');

    // let lang = await AsyncStorage.getItem('lang');
    if (user != null) {
      setTimeout(() => {
        Actions.pakwheelsbottomtab();
      }, 3000);
    } else {
      setTimeout(() => {
        Actions.signin();
      }, 3000);
      // }
      // if (app_intro == null) {
      //   Actions.app_intro_slider();
      // } else {
      //   setTimeout(() => {
      //     Actions.Roll_Screen()
      //   }, 3000)
      // }
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#064189',
        }}>
        {this.state.touchhh == false ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              height: '90%',
            }}>
            <Image
              source={require('../assets/pakwheelslogo.png')}
              style={styles.textage}
              resizeMode="contain"
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                width: width,
              }}>
              {this.state.spinner == true && <SkypeIndicator color="red" />}
            </View>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: 'white'}}></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textage: {
    width: '70%',
    height: '70%',
  },
});

export default Splash;
