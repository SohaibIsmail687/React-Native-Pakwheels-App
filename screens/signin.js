import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'native-base';
import Connection from '../connection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: '+92',
      show: false,
      name: '',
      email: '',
      password: '',
      spinner: false,
      dob: 'Date of Birth',
      show_date: false,
      img: null,
    };
  }

  login = () => {
    let uploaddata = new FormData();
    let email = this.state.email;
    let password = this.state.password;

    if (email == '') {
      alert('Please enter email.');
    } else if (password == '') {
      alert('Please enter password.');
    } else {
      this.setState({spinner: true});
      uploaddata.append('email', email);
      uploaddata.append('password', password);
      let api = Connection + 'restapi.php?action=login';

      console.log('pass => ', api);
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          otherHeader: 'foo',
        },
        body: uploaddata,
      })
        .then(response => response.json())
        .then(response => {
          if (response.response == 'fail') {
            this.setState({spinner: false});
            alert('Invalid email or password.');
          } else {
            this.setState({spinner: false});
            AsyncStorage.setItem('user', JSON.stringify(response.response));

            Actions.pakwheelsbottomtab({});
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: 'dodgerblue',
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height / 3.3,
          }}>
          <Icon
            name="user-circle"
            type="FontAwesome5"
            style={{color: 'white', fontSize: 75, marginBottom: 10}}
          />

          {/* <Image
            style={{
              width: '30%',
              height: '60%',
              marginTop: 2,
              resizeMode: 'contain',
            }}
            source={require('../assets/siggn.png')}
          /> */}
          <View style={{marginTop: -5}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
              SIGN IN
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: width,
            marginBottom: 20,
            // backgroundColor: 'yellow',
          }}>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 15, color: 'grey'}}>Username</Text>
          </View>
          <TextInput
            style={{
              marginTop: 8,
              marginHorizontal: -10,
              width: '95%',
              height: 45,
              borderColor: 'grey',
              borderWidth: 0.5,
              paddingLeft: 10,
              borderRadius: 6,
              alignSelf: 'center',
              color: 'black',
            }}
            placeholder="Enter Username"
            placeholderTextColor="grey"
            onChangeText={email => this.setState({email})}
          />

          <View style={{marginLeft: 10, marginTop: 15}}>
            <Text style={{fontSize: 15, color: 'grey'}}>Password</Text>
          </View>
          <TextInput
            style={{
              marginTop: 8,
              marginHorizontal: -10,
              width: '95%',
              height: 45,
              borderColor: 'grey',
              borderWidth: 0.5,
              paddingLeft: 10,
              borderRadius: 6,
              alignSelf: 'center',
              color: 'black',
            }}
            placeholder="Enter Password"
            placeholderTextColor="grey"
            onChangeText={password => this.setState({password})}
          />
        </View>

        <TouchableOpacity onPress={() => this.login()}>
          <View
            style={{
              backgroundColor: 'dodgerblue',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 6,
              width: width / 1.05,
              height: 45,
            }}>
            <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
              LOGIN
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
            // backgroundColor: 'yellow',
            paddingVertical: 10,
          }}>
          <TouchableOpacity onPress={() => Actions.resetPassword()}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={{fontSize: 18, color: 'grey'}}>
                Forgot Password?
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: 25}}>
            <Text style={{fontSize: 15, color: 'grey'}}>
              via social content
            </Text>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
            source={require('../assets/Toyota.jpg')}
          />
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
            source={require('../assets/Toyota.jpg')}
          />
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
            source={require('../assets/Toyota.jpg')}
          />
        </View>

        <View
          style={{
            // backgroundColor: 'turquoise',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
            width: width,
          }}>
          <TouchableOpacity onPress={() => Actions.signup()}>
            <Text
              style={{
                color: 'grey',
                fontSize: 17,
              }}>
              Don't have an account
              <Text style={{color: 'dodgerblue'}}> Register Now!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default signin;
