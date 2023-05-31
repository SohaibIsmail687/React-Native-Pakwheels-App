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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImageLoad from 'react-native-image-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import {Icon} from 'native-base';
import Connection from '../connection';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class update_profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: '+92',
      show: false,
      name: '',
      email: '',
      password: '',
      number: '',
      address: '',
      spinner: false,
      dob: 'Date of Birth',
      show_date: false,
      img: null,
    };
  }

  componentDidMount = async () => {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );

    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    console.log('kkkkkkkkkkkk', user);
    let id = parsed[0].id;
    let name = parsed[0].name;
    let email = parsed[0].email;
    let password = parsed[0].password;
    let address = parsed[0].adress;
    let number = parsed[0].number;
    let dob = parsed[0].dob;
    let profile = parsed[0].profile;

    this.setState({
      id: id,
      name: name,
      email: email,
      password: password,
      dob: dob,
      profile: profile,
      address:address,
      number:number,
    });
    // console.log('kkkkkkkkkkkk', this.state.id);
    // this.All_Ad();
  };

  uploadimage1 = async () => {
    this.RBSheet1.close();
    ImagePicker.launchImageLibrary(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        // console.log('response =', response);
        if (response.didCancel) {
          console.log('user cancelled  image picker');
        } else if (response.error) {
          console.log('imagepicker error : ', response.error);
        } else if (response.customButton) {
          console.log('user tapped  custom button : ', response.customButton);
        } else {
          console.log('outdoor image ', response.assets[0].uri);

          let text = response.assets[0].uri;
          console.log('outdoor image1111111111 ', text);

          this.setState({img: text, imagecheck: true});
        }
      },
    );
  };

  Check_PlatForm = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_1();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_1();
      console.log('Platform Android');
    }
  };

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

  update_profile = () => {
    let uploaddata = new FormData();

    let id = this.state.id;
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let number = this.state.number;
    let address = this.state.address;
    let dob = this.state.dob;
    let phone_number = this.state.placeholder + this.state.number;

    console.log('ADRESSSSSSSSSSSSS => ', address);
    console.log('NUMBERRRRRRRRRRRR => ', number);

    this.setState({spinner: true});

    uploaddata.append('id', id);
    uploaddata.append('name', name);
    uploaddata.append('email', email);
    uploaddata.append('password', password);
    uploaddata.append('phone_number', phone_number);
    uploaddata.append('address', address);
    uploaddata.append('dob', dob);

    let api = Connection + 'restapi.php?action=update_profile';
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

        if (response.response == 'fail') {
          this.setState({
            spinner: false,
          });
          alert('fail');
        } else {
          this.setState({
            spinner: false,
          });

          AsyncStorage.setItem('user', JSON.stringify(response.response));

          

          Toast.show('You successfully posted your ad.');
          Actions.pakwheelsbottomtab();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  //   Sign_Up = () => {
  //     const newImage = {
  //       uri: this.state.img,
  //       name: 'my_photo.jpg',
  //       type: 'image/jpg',
  //     };

  //     let uploaddata = new FormData();

  //     let name = this.state.name;
  //     let email = this.state.email;
  //     let password = this.state.password;
  //     let dob = this.state.dob;

  //     console.log('namenamename => ', name);
  //     console.log('namenamename => ', email);

  //     console.log('namenamename => ', password);
  //     console.log('namenamename => ', dob);

  //     this.setState({spinner: true});

  //     uploaddata.append('name', name);
  //     uploaddata.append('email', email);
  //     uploaddata.append('password', password);
  //     uploaddata.append('dob', dob);
  //     uploaddata.append('image', newImage);

  //     let api = Connection + 'restapi.php?action=Add_user';
  //     console.log('pass => ', api);
  //     fetch(api, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         otherHeader: 'foo',
  //       },
  //       body: uploaddata,
  //     })
  //       .then(response => response.json())
  //       .then(response => {
  //         console.log('response', response.response);

  //         if (response.response == 'repeat') {
  //           this.setState({
  //             spinner: false,
  //           });
  //           alert('This email already exist');
  //         } else if (response.response == 'fail') {
  //           this.setState({
  //             spinner: false,
  //           });
  //           alert(this.props.Something_went_wrong);
  //         } else {
  //           this.setState({
  //             spinner: false,
  //           });

  //           Toast.show('You successfully registered as user.');
  //           Actions.signin();
  //         }
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   };

  select_Date = date => {
    console.log(date);
    let dd = date.toISOString().split('T');
    let d1 = dd[0];

    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e10);

    console.log(d1);
    let d2 = d1.split('-');
    let mm = d2[1];
    let dd_dd = d2[2];
    let yy = d2[0];
    let final_date = mm + '-' + dd_dd + '-' + yy;

    console.log(final_date);

    // console.log(date.toISOString().split('.')[0] + 'Z');

    this.setState({
      show_date: false,
      dob: final_date,
      age: getAge,
    });
  };

  cancel = () => {
    this.setState({
      show_date: false,
    });
  };

  showtimepicker1() {
    this.setState({
      show_date: true,
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'dodgerblue',
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Icon
            name="arrowleft"
            type="AntDesign"
            style={{color: 'white'}}
            onPress={() => Actions.pop()}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 'bold',
              // paddingLeft: 35,
            }}>
            Update Profile
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 'bold',
              // paddingLeft: 35,
            }}></Text>
        </View>

        <View style={{marginLeft: 20, marginTop: 10}}>
          <Text style={{fontSize: 15, color: 'grey'}}>Full Name</Text>
        </View>
        <TextInput
          style={{
            marginTop: 8,
            width: width / 1.1,
            alignSelf: 'center',
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

        <View style={{marginLeft: 20, marginTop: 10}}>
          <Text style={{fontSize: 15, color: 'grey'}}>Email Address</Text>
        </View>
        <TextInput
          style={{
            marginTop: 8,
            width: width / 1.1,
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

        <View style={{marginLeft: 20, marginTop: 10}}>
          <Text style={{fontSize: 15, color: 'grey'}}>Password</Text>
        </View>
        <TextInput
          style={{
            marginTop: 8,
            width: width / 1.1,
            alignSelf: 'center',
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
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
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
              marginLeft: 7,
              paddingLeft: 10,
              width: '81%',
              color: 'black',
              borderColor: 'gray',
              borderWidth: 0.5,
            }}
            placeholder="Phone Number"
            placeholderTextColor="gray"
          />
        </View>

        <View style={{marginLeft: 20, marginTop: 10}}>
          <Text style={{fontSize: 15, color: 'grey'}}>Address</Text>
        </View>
        <TextInput
          style={{
            marginTop: 8,
            width: width / 1.1,
            alignSelf: 'center',
            height: 45,
            borderColor: 'grey',
            borderWidth: 0.5,
            paddingLeft: 10,
            borderRadius: 6,
            alignSelf: 'center',
            color: 'black',
          }}
          placeholder="Enter Address"
          placeholderTextColor="grey"
          onChangeText={address => this.setState({address})}
          value={this.state.address}
        />

        <Text
          style={{
            color: 'gray',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Date Of Birth
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.showtimepicker1()}
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            marginTop: 10,
            height: 45,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'gray',
            borderRadius: 6,
            borderWidth: 0.5,
            paddingHorizontal: 15,
          }}>
          <Text
            style={
              this.state.dob == 'Date of Birth'
                ? {color: 'black'}
                : {color: 'black'}
            }>
            {this.state.dob}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={this.state.show_date}
          // date={new Date('1985-01-17',)}

          mode="date"
          // format='YYYY'
          onConfirm={date => this.select_Date(date)}
          onCancel={() => this.cancel()}
          timeZoneOffsetInMinutes={0}
          display="spinner"
        />

        <TouchableOpacity
          onPress={() => this.update_profile()}
          style={{
            backgroundColor: 'dodgerblue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            width: width / 1.1,
            alignSelf: 'center',
            height: 45,
            marginTop: 50,
          }}>
          <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
            Update Profile
          </Text>
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

        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          height={230}
          openDuration={200}
          customStyles={{
            container: {
              paddingHorizontal: 20,
            },
          }}>
          <View>
            <Text style={{fontSize: 18, color: 'black', marginTop: 20}}>
              Choose an action
            </Text>

            <View style={{flexDirection: 'row', marginTop: 30}}>
              <TouchableOpacity
                onPress={() => this.uploadimage1()}
                activeOpacity={0.6}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="images"
                    type="Entypo"
                    color="white"
                    style={{fontSize: 30, color: 'black'}}
                  />
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    Gallery
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.Check_PlatForm()}
                activeOpacity={0.6}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    type="Entypo"
                    color="white"
                    style={{fontSize: 30, color: 'black'}}
                  />
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    Camera
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

export default update_profile;
