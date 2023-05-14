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
import {CountryPicker} from 'react-native-country-codes-picker';
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
import Toast from 'react-native-simple-toast';

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
    };
  }

  show_country = () => {
    this.setState({
      show: true,
    });
  };

  setCountryCode = val => {
    console.log(val);
    this.setState({
      show: false,
      placeholder: val,
    });
  };

  Sign_Up = () => {
    let uploaddata = new FormData();

    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;

    console.log('namenamename => ', name);
    console.log('namenamename => ', email);

    console.log('namenamename => ', password);

    this.setState({spinner: true});
    this.setState({name: '', email: '', password: '',});

    uploaddata.append('name', name);
    uploaddata.append('email', email);
    uploaddata.append('password', password);

    let api = 'http://192.168.100.23/api/restapi.php?action=Add_user';
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
        console.log('response', response.response);

        if (response.response == 'repeat') {
          this.setState({
            spinner: false,
          });
          alert('This email already exist');
        } else if (response.response == 'fail') {
          this.setState({
            spinner: false,
          });
          alert(this.props.Something_went_wrong);
        } else {
          this.setState({
            spinner: false,
          });

          Toast.show('You successfully registered as user.');
          Actions.signin();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white', flexWrap: 'wrap'}}>
        <View
          style={{
            backgroundColor: 'dodgerblue',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '30%',
          }}>
          <Image
            style={{
              width: '30%',
              height: '60%',
              marginTop: 2,
              resizeMode: 'contain',
            }}
            source={require('../assets/siggn.png')}
          />
          <View style={{marginTop: -5}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>
              SIGN UP
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            width: '100%',
            height: '35%',
            // backgroundColor: 'yellow',
          }}>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 15, color: 'grey'}}>Full Name</Text>
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
            placeholder="Enter Name"
            placeholderTextColor="grey"
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />

          <View style={{marginLeft: 10, marginTop: 15}}>
            <Text style={{fontSize: 15, color: 'grey'}}>Email Address</Text>
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
            placeholder="Enter Email"
            placeholderTextColor="grey"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />

          <View style={{marginLeft: 10}}>
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
            value={this.state.password}
          />

          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              // Horizontal:20,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => this.show_country()}
              style={{
                borderColor: 'gray',
                borderWidth: 0.5,
                paddingHorizontal: 15,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <Text style={{color: 'gray'}}>{this.state.placeholder}</Text>
            </TouchableOpacity>
            <CountryPicker
              show={this.state.show}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                this.setCountryCode(item.dial_code);
              }}
              androidWindowSoftInputMode={false}
              // inputPlaceholder=""
              // initialState={this.state.placeholder}
              // initialState={'+98'}
              inputPlaceholder="Search"
              style={{
                // Styles for whole modal [View]
                modal: {
                  height: 400,
                  // backgroundColor: 'red'
                },

                // Styles for input [TextInput]
                textInput: {
                  height: 50,
                  borderRadius: 0,
                },
                // Styles for country button [TouchableOpacity]
                countryButtonStyles: {
                  height: 50,
                },
              }}
            />
            <TextInput
              value={this.state.number}
              onChangeText={number => this.setState({number})}
              style={{
                height: 45,
                borderRadius: 4,
                marginLeft: 10,
                paddingLeft: 10,
                width: '81%',
                color: 'black',
                borderColor: 'gray',
                borderWidth: 0.5,
              }}
              placeholder="Phone Number"
              placeholderTextColor="gray"
            />

            {/* <Icon   name="phone" type="Entypo" style={{ color: "#781517", fontSize: 24 }} /> */}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.Sign_Up()}
          style={{
            backgroundColor: 'dodgerblue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            marginLeft: 10,
            width: '95%',
            height: 45,
            marginTop: 50,
          }}>
          <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
            REGISTER
          </Text>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
            // backgroundColor: 'yellow',
            height: '7%',
          }}>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={{fontSize: 15, color: 'grey'}}>
              via social content
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => Actions.signin()}>
          <View
            style={{
              // backgroundColor: 'turquoise',
              alignItems: 'center',
              // height:'3%'
            }}>
            <Text
              style={{
                color: 'grey',
                fontSize: 17,
                marginTop: 30,
              }}>
              Don't have an account
              <Text style={{color: 'dodgerblue'}}> Login!</Text>
            </Text>
          </View>
        </TouchableOpacity>

        {this.state.spinner == true && (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(2, 2, 2, 0.8)',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width / 2.5,
                height: height / 9 - 20,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                borderRadius: 6,
              }}>
              <UIActivityIndicator style={{}} color="#781517" />
              <Text
                style={{
                  fontSize: 16,
                  color: '#781517',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginRight: 10,
                }}>
                Loading...
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default signin;
