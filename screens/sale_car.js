import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import pakwheelsbottomtab from '../screens/pakwheelsbottomtab';
import pakwheelsads from '../screens/pakwheelsads';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import ImageLoad from 'react-native-image-placeholder';
import * as ImagePicker from 'react-native-image-picker';
import Connection from '../connection';
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

class sale_car extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOn2: false,
      img: null,
      location: '',
      model: '',
      RegisteredIn: '',
      kmsdriven: '',
      price: '',
      description: '',
      name: '',
      mobile: '',
      color: '',
      data: [],
      text1: 1,
      text2: 1,
      text3: 1,
      text4: 1,
      fuel: '',
      engine: '',
      transmission: '',
      assembly: '',
      feature_database_array: [],
      feature_array: [
        {
          name: 'Air Bugs',
          id: '1',
        },
        {
          name: 'DVD Player',
          id: '2',
        },
        {
          name: 'Air Conditioning',
          id: '3',
        },
        {
          name: 'Immobilizer Key',
          id: '4',
        },
        {
          name: 'Alloy Rims',
          id: '5',
        },
        {
          name: 'Navigation System',
          id: '6',
        },
      ],
    };
  }

  done = () => {
    this.Feature_RBSheet.close();
    console.log(
      'featureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      this.state.feature_database_array,
    );
  };

  selected_time = (val, val1) => {
    let record1 = this.state.feature_array;
    let len = record1.length;
    let boxes = 'box' + val;

    if (this.state[boxes] == false) {
      this.setState({[boxes]: true});

      this.state.feature_database_array.push(val1);
    } else {
      this.setState({[boxes]: false});

      let index1 = this.state.feature_database_array.findIndex(
        x => x.id == val,
      );

      console.log('index111111111', index1);
      setTimeout(() => {
        this.state.feature_database_array.splice(index1, 1);

        this.setState({
          feature_database_array: this.state.feature_database_array,
        });
      }, 100);
    }
  };

  feature_list = () => {
    let table = [];
    let record = this.state.feature_array;
    let len = record.length;

    if (record != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record[i].name;
        let id = record[i].id;
        let boxes = 'box' + id;
        console.log('boxesboxesboxesboxesboxes', boxes);

        table.push(
          <View>
            {
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>{name}</Text>

                  <CheckBox
                    disabled={false}
                    value={this.state[boxes] == true ? true : false}
                    onValueChange={() => this.selected_time(id, name)}
                    tintColors={{true: '#09448D', false: 'gray'}}
                  />
                </View>
              </TouchableOpacity>
            }
          </View>,
        );
      }
      return table;
    } else {
      let img = [];
      img.push(
        <View style={{flex: 1, justifyContent: 'center'}}>
          {<View></View>}
        </View>,
      );
      return img;
    }
  };

  componentDidMount = async () => {
    let record = this.state.feature_array;
    let len = record.length;

    for (let i = 0; i < len; i++) {
      let name = record[i].name;
      let id = record[i].id;
      let boxes = 'box' + id;
      this.setState({[boxes]: false});
    }
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );

    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    console.log('kkkkkkkkkkkk', user);
    let id = parsed[0].id;
    this.setState({
      id: id,
    });
    console.log('kkkkkkkkkkkk', this.state.id);
    // this.get_appointments_user();
  };

  toggle = isOn2 => {
    this.setState({
      isOn2: isOn2,
    });
  };

  select_loc = location_val => {
    this.setState({
      location: location_val,
    });
    this.Loc_RBSheet.close();
  };

  select_model = model_val => {
    this.setState({
      model: model_val,
    });
    this.Car_Model_RBSheet.close();
  };

  select_Registered = RegisteredIn_val => {
    this.setState({
      RegisteredIn: RegisteredIn_val,
    });
    this.Registered_In_RBSheet.close();
  };

  select_color = color_val => {
    this.setState({
      color: color_val,
    });
    this.Body_Color_RBSheet.close();
  };

  select_description = desc_val => {
    if (this.state.description == '') {
      this.setState({
        description: desc_val,
      });
    } else {
      let multi_desc = this.state.description + ', ' + desc_val;
      this.setState({
        description: multi_desc,
      });
    }
  };

  select_fuel = fuel_val => {
    this.setState({
      fuel: fuel_val,
    });
    this.Fuel_RBSheet.close();
  };

  uploadimage1 = async () => {
    this.Photo_RBSheet.close();
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
          // this.Add_button();
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

  Add_button = () => {
    // console.log('Task:', this.state.Task);
    // console.log('Date:', this.state.Date);
    // console.log('Description:', this.state.Description);

    let obj_button = {
      image: this.state.img,
    };
    this.state.data.push(obj_button);
    console.log('Image Added:', this.state.data);
    this.setState({img: null});
  };

  createlist = () => {
    let table = [];
    let record = this.state.data;
    let len = record.length;

    if (record != 'fail') {
      for (let i = 0; i < len; i++) {
        let image = record[i].image;

        table.push(
          <View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width / 2.5,
                  alignSelf: 'center',
                  marginTop: 20,
                  paddingRight: 15,
                }}>
                <ImageLoad
                  style={{
                    width: '100%',
                    height: 110,
                  }}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: image}}
                  resizeMode="stretch"
                  placeholderStyle={{
                    width: '100%',
                    height: 110,
                  }}
                />
                <Icon
                  name="checkbox-marked-circle"
                  type="MaterialCommunityIcons"
                  style={{
                    position: 'absolute',
                    top: 3,
                    right: 18,
                    color: 'green',
                    fontSize: 22,
                  }}
                />
              </View>
            }
          </View>,
        );
      }
      return table;
    } else {
      let img = [];
      img.push(
        <View style={{flex: 1, justifyContent: 'center'}}>
          {<View></View>}
        </View>,
      );
      return img;
    }
  };

  Post_Ad = () => {
    const newImage = {
      uri: this.state.img,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    let uploaddata = new FormData();

    let location = this.state.location;
    let model = this.state.model;
    let RegisteredIn = this.state.RegisteredIn;
    let color = this.state.color;
    let kmsdriven = this.state.kmsdriven;
    let price = this.state.price;
    let description = this.state.description;
    let name = this.state.name;
    let mobile = this.state.mobile;
    let fuel = this.state.fuel;
    let engine = this.state.engine;
    let transmission = this.state.transmission;
    let assembly = this.state.assembly;
    let features = JSON.stringify(this.state.feature_database_array);

    console.log('namenamename => ', features);
    console.log('namenamename => ', kmsdriven);

    this.setState({spinner: true});

    uploaddata.append('id', this.state.id);
    uploaddata.append('image', newImage);
    uploaddata.append('location', location);
    uploaddata.append('model', model);
    uploaddata.append('RegisteredIn', RegisteredIn);
    uploaddata.append('color', color);
    uploaddata.append('kmsdriven', kmsdriven);
    uploaddata.append('price', price);
    uploaddata.append('description', description);
    uploaddata.append('name', name);
    uploaddata.append('mobile', mobile);
    uploaddata.append('fuel', fuel);
    uploaddata.append('engine', engine);
    uploaddata.append('transmission', transmission);
    uploaddata.append('assembly', assembly);
    uploaddata.append('features', features);

    let api = Connection + 'restapi.php?action=Insert_Ads';
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

          Toast.show('You successfully posted your ad.');
          Actions.pakwheelsads();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  changebtn(value, val) {
    this.setState({
      transmission: val,
    });

    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,

        [value]: 2,
      });
    } else {
      this.setState({
        text1: 1,
        text2: 1,

        [value]: 2,
      });
    }
    setTimeout(() => {
      // this.My_Ads();
    }, 100);
  }

  changebtn2(value, val) {
    this.setState({
      assembly: val,
    });

    if (this.state[value] == 2) {
      this.setState({
        text3: 1,
        text4: 1,

        [value]: 2,
      });
    } else {
      this.setState({
        text3: 1,
        text4: 1,

        [value]: 2,
      });
    }
    setTimeout(() => {
      // this.My_Ads();
    }, 100);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#064189',
              paddingVertical: 15,
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Icon
              onPress={() => Actions.pop()}
              name="arrowleft"
              type="AntDesign"
              style={{color: 'white'}}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 17,
                fontWeight: 'bold',
                paddingLeft: 25,
              }}>
              Sell Your Car
            </Text>
          </View>

          {this.state.img == null ? (
            <View
              style={{
                paddingVertical: 30,
                borderBottomWidth: 0.5,
                borderBottomColor: 'lightgray',
                backgroundColor: 'white',
                shadowOffset: 10,
                shadowOpacity: 10,
                shadowColor: 'gray',
                elevation: 5,
              }}>
              <TouchableOpacity onPress={() => this.Photo_RBSheet.open()}>
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: 'dodgerblue',
                    borderStyle: 'dashed',
                    width: width / 1.09,
                    alignSelf: 'center',
                    paddingVertical: 30,
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera-plus-outline"
                    type="MaterialCommunityIcons"
                    style={{color: 'gray', fontSize: 40}}
                  />

                  <Text
                    style={
                      this.state.data == ''
                        ? {color: '#064189'}
                        : {color: '#064189', paddingLeft: 10}
                    }>
                    Add Photo
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'gray',
                  width: '92%',
                  alignSelf: 'center',
                  paddingTop: 3,
                }}
                numberOfLines={2}>
                Tap on images to edit them. To reorder, select the image, hold
                and drag.
              </Text>
            </View>
          ) : (
            <View>
              <ImageLoad
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 2,
                  borderRadius: 150,
                  alignSelf: 'center',
                  borderColor: '#781517',
                }}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.state.img}}
                borderRadius={150}
                placeholderStyle={{
                  width: 100,
                  height: 100,
                  borderWidth: 2,
                  borderRadius: 150,
                  borderColor: '#781517',
                }}
              />

              <View
                style={{
                  paddingVertical: 10,
                  // backgroundColor: 'white',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <TouchableOpacity onPress={() => this.Photo_RBSheet.open()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      backgroundColor: '#e5eefc',
                      paddingVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera-plus-outline"
                      type="MaterialCommunityIcons"
                      style={{color: 'gray', fontSize: 20}}
                    />

                    <Text
                      style={
                        this.state.data == ''
                          ? {color: '#064189'}
                          : {color: '#064189', paddingLeft: 10}
                      }>
                      Add more photos
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'gray',
                    width: '92%',
                    alignSelf: 'center',
                    paddingTop: 3,
                  }}
                  numberOfLines={2}>
                  Tap on images to edit them. To reorder, select the image, hold
                  and drag.
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity onPress={() => this.Loc_RBSheet.open()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 20,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: '13%',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="hospital-building"
                  type="MaterialCommunityIcons"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <View>
                  <Text
                    style={
                      this.state.location == ''
                        ? {
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 20,
                          }
                        : {color: 'black'}
                    }>
                    Location
                  </Text>
                  {this.state.location != '' && (
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        paddingTop: 3,
                        paddingBottom: 10,
                      }}>
                      {this.state.location}
                    </Text>
                  )}
                </View>
                <Icon
                  name="down"
                  type="AntDesign"
                  style={{fontSize: 15, color: 'gray'}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.Car_Model_RBSheet.open()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: '13%',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="car"
                  type="FontAwesome5"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <View>
                  <Text
                    style={
                      this.state.model == ''
                        ? {
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 20,
                          }
                        : {color: 'black'}
                    }>
                    Car Model
                  </Text>
                  {this.state.model != '' && (
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        paddingTop: 3,
                        paddingBottom: 10,
                      }}>
                      {this.state.model}
                    </Text>
                  )}
                </View>
                <Icon
                  name="down"
                  type="AntDesign"
                  style={{fontSize: 15, color: 'gray'}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.Registered_In_RBSheet.open()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: '13%',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="hospital-building"
                  type="MaterialCommunityIcons"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <View>
                  <Text
                    style={
                      this.state.RegisteredIn == ''
                        ? {
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 20,
                          }
                        : {color: 'black'}
                    }>
                    Registered In
                  </Text>
                  {this.state.RegisteredIn != '' && (
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        paddingTop: 3,
                        paddingBottom: 10,
                      }}>
                      {this.state.RegisteredIn}
                    </Text>
                  )}
                </View>

                <Icon
                  name="down"
                  type="AntDesign"
                  style={{fontSize: 15, color: 'gray'}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.Body_Color_RBSheet.open()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: '13%',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="format-color-fill"
                  type="MaterialCommunityIcons"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <View>
                  <Text
                    style={
                      this.state.color == ''
                        ? {
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 20,
                          }
                        : {color: 'black'}
                    }>
                    Color
                  </Text>
                  {this.state.color != '' && (
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        paddingTop: 3,
                        paddingBottom: 10,
                      }}>
                      {this.state.color}
                    </Text>
                  )}
                </View>
                <Icon
                  name="down"
                  type="AntDesign"
                  style={{fontSize: 15, color: 'gray'}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 13,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#f4f2f2',
                width: '13%',
                alignItems: 'center',
                paddingVertical: 9,
                borderRadius: 50,
              }}>
              <Icon
                name="speedometer"
                type="Ionicons"
                style={{color: 'gray', fontSize: 23}}
              />
            </View>
            <View
              style={{
                width: '83%',
                backgroundColor: 'white',
                marginLeft: 15,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                KMS Driven
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 38,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                  color: 'gray',
                  textAlignVertical: 'bottom',
                }}
                placeholder="Specify KMs Driven"
                placeholderTextColor="gray"
                onChangeText={kmsdriven => this.setState({kmsdriven})}
                value={this.state.kmsdriven}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 13,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#f4f2f2',
                width: '13%',
                alignItems: 'center',
                paddingVertical: 9,
                borderRadius: 50,
              }}>
              <Icon
                name="pricetag-multiple"
                type="Foundation"
                style={{color: 'gray', fontSize: 23}}
              />
            </View>
            <View
              style={{
                width: '83%',
                backgroundColor: 'white',
                marginLeft: 15,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Price (PKR)
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 38,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                  color: 'gray',
                  textAlignVertical: 'bottom',
                }}
                placeholder="Set a price"
                placeholderTextColor="gray"
                onChangeText={price => this.setState({price})}
                value={this.state.price}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 13,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#f4f2f2',
                width: '13%',
                alignItems: 'center',
                paddingVertical: 9,
                borderRadius: 50,
              }}>
              <Icon
                name="layers-triple"
                type="MaterialCommunityIcons"
                style={{color: 'gray', fontSize: 23}}
              />
            </View>
            <View
              style={{
                width: '83%',
                backgroundColor: 'white',
                marginLeft: 15,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Description
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 38,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                  color: 'gray',
                  textAlignVertical: 'bottom',
                }}
                placeholder="For Example:Alloy Rims, First Owner, etc."
                placeholderTextColor="gray"
                onChangeText={description => this.setState({description})}
                value={this.state.description}
              />
            </View>
          </View>

          <ScrollView
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: width / 1.1,
              alignSelf: 'center',
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => this.select_description('Alloy Rims')}
              style={{
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                marginHorizontal: 2,
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                  alignSelf: 'center',
                }}>
                Alloy Rims
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.select_description('Army Officer Car')}
              style={{
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                marginHorizontal: 6,
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                }}>
                Army Officer Car
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.select_description('Auction Sheet Available')}
              style={{
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                marginHorizontal: 2,
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 6,
                }}>
                Auction Sheet Available
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.select_description('Authorized Workshop Maintained')
              }
              style={{
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                marginHorizontal: 6,
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 4,
                }}>
                Authorized Workshop Maintained
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <Text
            style={{
              color: 'dodgerblue',
              paddingVertical: 15,
              fontSize: 16,
              alignSelf: 'center',
            }}>
            View All Suggestions
          </Text>

          <View
            style={{
              backgroundColor: '#f4f2f2',
              paddingLeft: 22,
              paddingTop: 20,
              paddingBottom: 10,
            }}>
            <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
              Additional Info
            </Text>
          </View>

          <TouchableOpacity onPress={() => this.Fuel_RBSheet.open()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: '13%',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="hospital-building"
                  type="MaterialCommunityIcons"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <View>
                  <Text
                    style={
                      this.state.fuel == ''
                        ? {
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 20,
                          }
                        : {color: 'black'}
                    }>
                    Fuel Type
                  </Text>
                  {this.state.fuel != '' && (
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        paddingTop: 3,
                        paddingBottom: 10,
                      }}>
                      {this.state.fuel}
                    </Text>
                  )}
                </View>
                <Icon
                  name="down"
                  type="AntDesign"
                  style={{fontSize: 15, color: 'gray'}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 13,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#f4f2f2',
                width: '13%',
                alignItems: 'center',
                paddingVertical: 9,
                borderRadius: 50,
              }}>
              <Icon
                name="speedometer"
                type="Ionicons"
                style={{color: 'gray', fontSize: 23}}
              />
            </View>
            <View
              style={{
                width: '83%',
                backgroundColor: 'white',
                marginLeft: 15,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Engine Capacity(CC)
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 38,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                  color: 'gray',
                  textAlignVertical: 'bottom',
                }}
                placeholder="Specify Engine Capacity"
                placeholderTextColor="gray"
                onChangeText={engine => this.setState({engine})}
                value={this.state.engine}
              />
            </View>
          </View>

          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
                // justifyContent:'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="hospital-building"
                  type="MaterialCommunityIcons"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      // paddingVertical: 20,
                    }}>
                    Transmission
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              marginLeft: 70,
              borderBottomWidth: 0.5,
              borderBottomColor: 'lightgray',
            }}>
            <TouchableOpacity
              onPress={() => this.changebtn('text1', 'Automatic')}
              style={{
                // width:'50%',
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                paddingHorizontal: 16,
                marginTop: 20,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              {this.state.text1 == 2 && (
                <Icon
                  name="checkcircle"
                  type="AntDesign"
                  style={{color: 'dodgerblue', fontSize: 23}}
                />
              )}
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingLeft: 5,
                }}>
                Automatic
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.changebtn('text2', 'Manual')}
              style={{
                // width:'50%',
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                paddingHorizontal: 16,
                marginTop: 20,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20,
                flexDirection: 'row',
              }}>
              {this.state.text2 == 2 && (
                <Icon
                  name="checkcircle"
                  type="AntDesign"
                  style={{color: 'dodgerblue', fontSize: 23}}
                />
              )}
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingLeft: 5,
                }}>
                Manual
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
                // justifyContent:'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="hospital-building"
                  type="MaterialCommunityIcons"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      // paddingVertical: 20,
                    }}>
                    Assembly
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              marginLeft: 70,
              borderBottomWidth: 0.5,
              borderBottomColor: 'lightgray',
            }}>
            <TouchableOpacity
              onPress={() => this.changebtn2('text3', 'Imported')}
              style={{
                // width:'50%',
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                paddingHorizontal: 16,
                marginTop: 20,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              {this.state.text3 == 2 && (
                <Icon
                  name="checkcircle"
                  type="AntDesign"
                  style={{color: 'dodgerblue', fontSize: 23}}
                />
              )}
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingLeft: 5,
                }}>
                Imported
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.changebtn2('text4', 'Local')}
              style={{
                // width:'50%',
                backgroundColor: '#f4f2f2',
                borderRadius: 20,
                paddingHorizontal: 16,
                marginTop: 20,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 20,
                flexDirection: 'row',
              }}>
              {this.state.text4 == 2 && (
                <Icon
                  name="checkcircle"
                  type="AntDesign"
                  style={{color: 'dodgerblue', fontSize: 23}}
                />
              )}
              <Text
                style={{
                  color: 'gray',
                  fontSize: 15,
                  paddingLeft: 5,
                }}>
                Local
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this.Feature_RBSheet.open()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#f4f2f2',
                  width: '13%',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderRadius: 50,
                }}>
                <Icon
                  name="hospital-building"
                  type="MaterialCommunityIcons"
                  style={{color: 'gray', fontSize: 23}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '83%',
                  backgroundColor: 'white',
                  marginLeft: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <View>
                  <Text
                    style={
                      this.state.feature_database_array == ''
                        ? {
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 20,
                          }
                        : {color: 'black'}
                    }>
                    Features
                  </Text>
                  {this.state.feature_database_array != '' && (
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        paddingTop: 3,
                        paddingBottom: 10,
                      }}>
                      {this.state.feature_database_array}
                    </Text>
                  )}
                </View>
                <Icon
                  name="down"
                  type="AntDesign"
                  style={{fontSize: 15, color: 'gray'}}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#f4f2f2',
              paddingLeft: 22,
              paddingTop: 20,
              paddingBottom: 10,
              // marginTop:10,
            }}>
            <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
              Contact Information
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 13,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#f4f2f2',
                width: '13%',
                alignItems: 'center',
                paddingVertical: 9,
                borderRadius: 50,
              }}>
              <Icon
                name="man"
                type="Ionicons"
                style={{color: 'gray', fontSize: 23}}
              />
            </View>
            <View
              style={{
                width: '83%',
                backgroundColor: 'white',
                marginLeft: 15,
              }}>
              <Text style={{color: 'gray'}}>Name</Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 38,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                  color: 'black',
                  fontWeight: 'bold',
                  textAlignVertical: 'bottom',
                }}
                placeholder="Informative TV"
                placeholderTextColor="black"
                onChangeText={name => this.setState({name})}
                value={this.state.name}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 13,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#f4f2f2',
                width: '13%',
                alignItems: 'center',
                paddingVertical: 9,
                borderRadius: 50,
              }}>
              <Icon
                name="mobile1"
                type="AntDesign"
                style={{color: 'gray', fontSize: 23}}
              />
            </View>
            <View
              style={{
                width: '83%',
                backgroundColor: 'white',
                marginLeft: 15,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Mobile Number
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 38,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                  color: 'black',
                  textAlignVertical: 'bottom',
                }}
                placeholder="Enter Mobile Number"
                placeholderTextColor="gray"
                onChangeText={mobile => this.setState({mobile})}
                value={this.state.mobile}
              />
            </View>
          </View>

          <View
            style={{
              width: width / 1.3,
              marginRight: 13,
              alignSelf: 'flex-end',
              paddingTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'green',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}>
                <Icon
                  name="whatsapp"
                  type="MaterialCommunityIcons"
                  style={{color: 'white', fontSize: 25}}
                />
              </View>
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Allow Whatsapp contact
              </Text>
            </View>
            <ToggleSwitch
              isOn={this.state.isOn2}
              onColor="#FE0000"
              offColor="#c6c5c5"
              // label="Example label"
              // labelStyle={{ color: "black", fontWeight: "900" }}
              size="small"
              onToggle={isOn2 => this.toggle(isOn2)}
            />
          </View>

          <TouchableOpacity onPress={() => this.Post_Ad()}>
            <View
              style={{
                width: width / 1.08,
                alignSelf: 'center',
                backgroundColor: 'dodgerblue',
                marginTop: 25,
                marginBottom: 10,
                alignItems: 'center',
                paddingVertical: 8,
                borderRadius: 4,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Post Your Ad
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <RBSheet
          ref={ref => {
            this.Loc_RBSheet = ref;
          }}
          height={720}
          openDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{}}>
              <View
                style={{
                  paddingLeft: 20,
                  paddingVertical: 15,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  Select City
                </Text>
              </View>

              <TouchableOpacity>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <TextInput
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      height: 40,
                      borderRadius: 3,
                      paddingLeft: 40,
                      color: 'darkgrey',
                      backgroundColor: '#f4f2f2',
                      fontSize: 16,
                    }}
                    placeholder="Type to refine search"
                    placeholderTextColor="gray"
                  />
                  <Icon
                    name="search"
                    type="Ionicons"
                    style={{
                      color: 'gray',
                      fontSize: 18,
                      position: 'absolute',
                      left: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  paddingTop: 25,
                  paddingBottom: 10,
                }}>
                <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                  Popular Cities
                </Text>
              </View>

              <TouchableOpacity onPress={() => this.select_loc('Islamabad')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Islamabad</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_loc('Karachi')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Karachi</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_loc('Lahore')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Lahore</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_loc('Peshawar')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Peshawar</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_loc('Quetta')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Quetta</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  paddingTop: 25,
                  paddingBottom: 10,
                }}>
                <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                  Other Cities
                </Text>
              </View>

              <TouchableOpacity onPress={() => this.select_loc('Abbottabad')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Abbottabad</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_loc('Gujranwala')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Gujranwala</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.select_loc('Jalal pur Jattan')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Jalal pur Jattan</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.select_loc('Qila Kalar Wala')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Qila Kalar Wala</Text>
                  <Icon
                    name="right"
                    type="AntDesign"
                    style={{fontSize: 15, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        {/* Car Model RBSheet starts here */}

        <RBSheet
          ref={ref => {
            this.Car_Model_RBSheet = ref;
          }}
          height={720}
          openDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{}}>
              <View
                style={{
                  paddingLeft: 20,
                  paddingVertical: 15,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  Select Year
                </Text>
              </View>

              <TouchableOpacity onPress={() => this.select_model('2023')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2023</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2022')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2022</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2021')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2021</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2020')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2020</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2019')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2019</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2018')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2018</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2017')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2017</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2016')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2016</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2015')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2015</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2014')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2014</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2013')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2013</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2012')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2012</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_model('2011')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>2011</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        {/* Here starts the Registered In RBSheet */}

        <RBSheet
          ref={ref => {
            this.Registered_In_RBSheet = ref;
          }}
          height={720}
          openDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{}}>
              <View
                style={{
                  paddingLeft: 20,
                  paddingVertical: 15,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  Select Registration City
                </Text>
              </View>

              <TouchableOpacity>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <TextInput
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      height: 40,
                      borderRadius: 3,
                      paddingLeft: 40,
                      color: 'darkgrey',
                      backgroundColor: '#f4f2f2',
                      fontSize: 16,
                    }}
                    placeholder="Type to refine search"
                    placeholderTextColor="gray"
                  />
                  <Icon
                    name="search"
                    type="Ionicons"
                    style={{
                      color: 'gray',
                      fontSize: 18,
                      position: 'absolute',
                      left: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.select_Registered('Unregistered')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingTop: 25,
                    paddingBottom: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Unregistered</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  paddingTop: 25,
                  paddingBottom: 10,
                }}>
                <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                  Provinces
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.select_Registered('Punjab')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Punjab</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_Registered('Sindh')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Sindh</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  paddingTop: 25,
                  paddingBottom: 10,
                }}>
                <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                  Popular Cities
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.select_Registered('Islamabad')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Islamabad</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.select_Registered('Karachi')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Karachi</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.select_Registered('Peshawar')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Peshawar</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  paddingTop: 25,
                  paddingBottom: 10,
                }}>
                <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                  Other Cities
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.select_Registered('Gujranwala')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Gujranwala</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.select_Registered('Jalal Pur Jattan')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Jalal Pur Jattan</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.select_Registered('Qila Kalar Wala')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    paddingVertical: 15,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Qila Kalar Wala</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        {/* Here starts the Body Color RBSheet */}
        <RBSheet
          ref={ref => {
            this.Body_Color_RBSheet = ref;
          }}
          height={520}
          openDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: width / 1.1,
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 25,
                }}>
                <Text
                  style={{color: '#031f5b', fontWeight: 'bold', fontSize: 19}}>
                  Body Color
                </Text>
                <TouchableOpacity
                  onPress={() => this.Body_Color_RBSheet.close()}>
                  <Text style={{color: 'dodgerblue'}}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: width / 1.1,
                  alignSelf: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => this.select_color('white')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'white',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>White</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Silver')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'silver',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Silver</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Black')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'black',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Black</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Grey')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'grey',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Grey</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Blue')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: '#031f5b',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Blue</Text>
                  </View>
                </TouchableOpacity>

                {/* 2nd Row of Colors */}

                <TouchableOpacity onPress={() => this.select_color('Green')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'green',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Green</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Red')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'red',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Red</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Gold')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'gold',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Gold</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Maroon')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'maroon',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Maroon</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Beige')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'beige',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Beige</Text>
                  </View>
                </TouchableOpacity>

                {/* 3rd Row of Colors */}

                <TouchableOpacity onPress={() => this.select_color('Pink')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'pink',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Pink</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Brown')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'brown',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Brown</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Cyan')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'cyan',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Cyan</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Yellow')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'yellow',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Yellow</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Lavender')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'lavender',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>
                      Lavender
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* 4th Row of Colors */}

                <TouchableOpacity onPress={() => this.select_color('Purple')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'purple',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Purple</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Olive')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'olive',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Olive</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Orange')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'orange',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Orange</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Indigo')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'indigo',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Indigo</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.select_color('Teal')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'teal',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Teal</Text>
                  </View>
                </TouchableOpacity>

                {/* 5th row of Colors */}

                <TouchableOpacity onPress={() => this.select_color('wheat')}>
                  <View
                    style={{
                      width: width / 6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 30,
                    }}>
                    <View
                      style={{
                        width: '58%',
                        backgroundColor: 'wheat',
                        paddingVertical: 16.5,
                        borderWidth: 0.5,
                        borderColor: 'lightgray',
                        borderRadius: 50,
                      }}></View>
                    <Text style={{color: 'gray', paddingTop: 10}}>Wheat</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>

        <RBSheet
          ref={ref => {
            this.Photo_RBSheet = ref;
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

        <RBSheet
          ref={ref => {
            this.Fuel_RBSheet = ref;
          }}
          height={720}
          openDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{}}>
              <View
                style={{
                  paddingLeft: 20,
                  paddingVertical: 15,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  Select Fuel Type
                </Text>
              </View>

              <TouchableOpacity onPress={() => this.select_fuel('Petrol')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Petrol</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_fuel('Diesel')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Diesel</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_fuel('Hybrid')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Hybrid</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_fuel('CNG')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>CNG</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_fuel('LPG')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>LPG</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.select_fuel('Electric')}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Text style={{color: 'gray'}}>Electric</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        {/* Here starts the Feature RBSHEET */}

        <RBSheet
          ref={ref => {
            this.Feature_RBSheet = ref;
          }}
          height={720}
          openDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                }}>
                <Text style={{color: 'gray', fontWeight: 'bold'}}>
                  Features
                </Text>
                <TouchableOpacity onPress={() => this.Feature_RBSheet.close()}>
                  <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                    cancel
                  </Text>
                </TouchableOpacity>
              </View>

              {this.feature_list()}

              <TouchableOpacity onPress={() => this.done()}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    backgroundColor: 'dodgerblue',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Done</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

export default sale_car;
