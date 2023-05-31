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

class sale_auto_parts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOn2: false,
      img: null,
      location: '',
      category: '',
      title: '',
      price: '',
      description: '',
      name: '',
      mobile: '',
      data: [],
    };
  }

  componentDidMount = async () => {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );

    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    // console.log('kkkkkkkkkkkk', user);
    let id = parsed[0].id;
    this.setState({
      id: id,
    });
    // console.log('kkkkkkkkkkkk', this.state.id);
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

  select_category = cat_val => {
    this.setState({
      category: cat_val,
    });
    this.Category_RBSheet.close();
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

  Products_Ads = () => {
    const newImage = {
      uri: this.state.img,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    let uploaddata = new FormData();

    let location = this.state.location;
    let category = this.state.category;
    let title = this.state.title;
    let price = this.state.price;
    let description = this.state.description;
    let name = this.state.name;
    let mobile = this.state.mobile;

    console.log('namenamename => ', title);

    this.setState({spinner: true});

    uploaddata.append('id', this.state.id);
    uploaddata.append('image', newImage);
    uploaddata.append('location', location);
    uploaddata.append('category', category);
    uploaddata.append('title', title);
    uploaddata.append('price', price);
    uploaddata.append('description', description);
    uploaddata.append('name', name);
    uploaddata.append('mobile', mobile);

    let api = Connection + 'restapi.php?action=Products_Ads';
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
            Actions.pakwheelsbottomtab();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

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
              Sell Your Auto Parts
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

          <TouchableOpacity onPress={() => this.Category_RBSheet.open()}>
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
                      this.state.category == ''
                        ? {
                            fontWeight: 'bold',
                            color: 'black',
                            paddingVertical: 20,
                          }
                        : {color: 'black'}
                    }>
                    Category
                  </Text>
                  {this.state.category != '' && (
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        paddingTop: 3,
                        paddingBottom: 10,
                      }}>
                      {this.state.category}
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
              <Text style={{color: 'black', fontWeight: 'bold'}}>Title</Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 38,
                  borderBottomWidth: 0.5,
                  borderBottomColor: 'lightgray',
                  color: 'gray',
                  textAlignVertical: 'bottom',
                }}
                placeholder="Enter Title"
                placeholderTextColor="gray"
                onChangeText={title => this.setState({title})}
                value={this.state.title}
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

          <TouchableOpacity onPress={() => this.Products_Ads()}>
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
            this.Category_RBSheet = ref;
          }}
          height={720}
          openDuration={200}
          customStyles={{
            container: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <ScrollView>
            <View>
              <View style={{}}>
                <View
                  style={{
                    paddingLeft: 20,
                    paddingVertical: 15,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}></View>

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
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 20,
                    //   paddingVertical: 10,
                  }}>
                  <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                    Audio/Video
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.select_category('Amplifiers')}>
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
                    <Text style={{color: 'gray'}}>Amplifiers</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Android Panel')}>
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
                    <Text style={{color: 'gray'}}>Android Panel</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Base Tubes')}>
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
                    <Text style={{color: 'gray'}}>Base Tubes</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Speakers')}>
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
                    <Text style={{color: 'gray'}}>Speakers</Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 20,
                    //   paddingVertical: 10,
                  }}>
                  <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                    Bicycles
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.select_category('Mountain Bikes')}>
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
                    <Text style={{color: 'gray'}}>Mountain Bikes</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Sohrab')}>
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
                    <Text style={{color: 'gray'}}>Sohrab</Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 20,
                    //   paddingVertical: 10,
                  }}>
                  <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                    Bikes
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.select_category('Bike Air Filters')}>
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
                    <Text style={{color: 'gray'}}>Bike Air Filters</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Bike Clutch Plates')}>
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
                    <Text style={{color: 'gray'}}>Bike Clutch Plates</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Helmets')}>
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
                    <Text style={{color: 'gray'}}>Helmets</Text>
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 20,
                    //   paddingVertical: 10,
                  }}>
                  <Text style={{color: 'dodgerblue', fontWeight: 'bold'}}>
                    Engine & Mechanical
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => this.select_category('A/C Belt')}>
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
                    <Text style={{color: 'gray'}}>A/C Belt</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Ball Joints')}>
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
                    <Text style={{color: 'gray'}}>Ball Joints</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.select_category('Air Filters')}>
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
                    <Text style={{color: 'gray'}}>Air Filters</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
      </View>
    );
  }
}

export default sale_auto_parts;
