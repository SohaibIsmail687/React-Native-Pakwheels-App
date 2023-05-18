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
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import ad_details from '../screens/ad_details';
import Connection from '../connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageLoad from 'react-native-image-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class pakwheelsads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data5: [],
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
    this.setState({
      id: id,
    });
    console.log('kkkkkkkkkkkk', this.state.id);
    this.My_Ads();
  };

  My_Ads = () => {
    let api = Connection + 'restapi.php?action=My_Ads';
    console.log('pass => ', api);
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
      // body: uploaddata,
    })
      .then(response => response.json())
      .then(response => {
        let table = [];
        let record = response.response;
        let len = record.length;

        if (record != 'fail') {
          this.setState({
            data5: record,
            skalton: false,
          });
          console.log(record);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  createtable2 = () => {
    let table = [];
    let record1 = this.state.data5;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let id = record1[i].id;
        let userid = record1[i].user_id;
        let location = record1[i].location;
        let model = record1[i].model;
        let registeredIn = record1[i].registeredin;
        let color = record1[i].color;
        let kms = record1[i].kms;
        let price = record1[i].price;
        let desc = record1[i].desc;
        let name = record1[i].name;
        let phone = record1[i].phone;
        let profile1 = record1[i].photo;
        let profile = Connection + 'images/' + profile1;
        console.log(profile);
        table.push(
          <View>
            {
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  Actions.wheeldetails({
                    name1: name,
                  })
                }>
                <View style={{backgroundColor: 'white'}}>
                  <View
                    style={{
                      width: width / 1.07,
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      marginTop: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'lightgray',
                      marginBottom: 5,
                    }}>
                    <TouchableOpacity onPress={() => Actions.ad_details()}>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: 8,
                          paddingTop: 8,
                        }}>
                        <View style={{width: '40%'}}>
                          <ImageLoad
                            style={{
                              width: '100%',
                              height: 100,
                              resizeMode: 'stretch',
                              borderRadius: 10,
                            }}
                            loadingStyle={{size: 'large', color: 'blue'}}
                            source={{uri: profile}}
                            borderRadius={10}
                            placeholderStyle={{
                              width: '100%',
                              height: 100,
                              borderRadius: 10,
                            }}
                          />

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Icon
                              name="eye"
                              type="Ionicons"
                              style={{
                                position: 'absolute',
                                bottom: 5,
                                left: 10,
                                color: 'white',
                                fontSize: 15,
                              }}
                            />
                            <Text
                              style={{
                                position: 'absolute',
                                bottom: 5,
                                left: 30,
                                color: 'white',
                                fontSize: 12,
                              }}>
                              0
                            </Text>

                            <Icon
                              name="call"
                              type="Ionicons"
                              style={{
                                position: 'absolute',
                                bottom: 5,
                                right: 20,
                                color: 'white',
                                fontSize: 15,
                              }}
                            />
                            <Text
                              style={{
                                position: 'absolute',
                                bottom: 5,
                                right: 10,
                                color: 'white',
                                fontSize: 12,
                              }}>
                              0
                            </Text>
                          </View>
                        </View>

                        <View>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 15,
                              paddingLeft: 10,
                            }}>
                            {name}
                          </Text>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 17,
                              paddingLeft: 10,
                            }}>
                            PKR{' '}
                            <Text style={{fontWeight: 'bold'}}>{price}</Text>
                          </Text>
                          <Text style={{color: 'gray', paddingLeft: 10}}>
                            {location}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              paddingBottom: 15,
                              height: 30,
                            }}>
                            <View
                              style={{
                                borderEndWidth: 1,
                                borderEndColor: 'gray',
                                paddingLeft: 10,
                                paddingRight: 5,
                              }}>
                              <Text style={{color: 'gray'}}>{model}</Text>
                            </View>
                            <View
                              style={{
                                borderEndWidth: 1,
                                borderEndColor: 'gray',
                                paddingHorizontal: 5,
                              }}>
                              <Text style={{color: 'gray'}}>{color}</Text>
                            </View>
                            <View
                              style={{
                                borderEndColor: 'gray',
                                paddingHorizontal: 5,
                                borderLeftWidth: 0.2,
                              }}>
                              <Text style={{color: 'gray'}}>
                                {model}-stroke
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>

                    <View
                      style={{
                        paddingTop: 15,
                        paddingLeft: 10,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          width: '80%',
                          backgroundColor: 'dodgerblue',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 7,
                          borderRadius: 5,
                        }}>
                        <Icon
                          name="star"
                          type="FontAwesome"
                          style={{fontSize: 13, color: 'white'}}
                        />
                        <Text
                          style={{
                            color: 'white',
                            paddingLeft: 10,
                            fontSize: 15,
                          }}>
                          Feature This Ad
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => this.RBSheet1.open()}
                        activeOpacity={0.6}
                        style={{width: '17%'}}>
                        <View
                          style={{
                            backgroundColor: 'lightgray',
                            marginLeft: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 7,
                            borderRadius: 5,
                          }}>
                          <Icon
                            name="dots-three-horizontal"
                            type="Entypo"
                            style={{fontSize: 20, color: 'gray'}}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        color: 'gray',
                        paddingLeft: 10,
                        paddingVertical: 8,
                      }}>
                      Ad will expire in 45 days
                    </Text>
                  </View>
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#050b7f',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            My Ads
          </Text>
        </View>

        <View
          style={{
            width: width,
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
            shadowOffset: 10,
            shadowOpacity: 10,
            shadowColor: 'gray',
            elevation: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: 'gray', fontSize: 17}}>Active (1)</Text>
          </View>
          <View>
            <Text style={{color: 'gray', fontSize: 17}}>Pending (0)</Text>
          </View>
          <View>
            <Text style={{color: 'gray', fontSize: 17}}>Removed (0)</Text>
          </View>
        </View>

        {/* <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              width: width / 1.07,
              alignSelf: 'center',
              backgroundColor: 'white',
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'lightgray',
              marginBottom: 5,
            }}>
            <TouchableOpacity onPress={() => Actions.ad_details()}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 8,
                  paddingTop: 8,
                }}>
                <View style={{width: '40%'}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 100,
                      resizeMode: 'stretch',
                      borderRadius: 10,
                    }}
                    source={require('../assets/Toyota.jpg')}
                  />

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="eye"
                      type="Ionicons"
                      style={{
                        position: 'absolute',
                        bottom: 5,
                        left: 10,
                        color: 'white',
                        fontSize: 15,
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 5,
                        left: 30,
                        color: 'white',
                        fontSize: 12,
                      }}>
                      0
                    </Text>

                    <Icon
                      name="call"
                      type="Ionicons"
                      style={{
                        position: 'absolute',
                        bottom: 5,
                        right: 20,
                        color: 'white',
                        fontSize: 15,
                      }}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        bottom: 5,
                        right: 10,
                        color: 'white',
                        fontSize: 12,
                      }}>
                      0
                    </Text>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      paddingLeft: 10,
                    }}>
                    Yamaha YBR 125
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 17,
                      paddingLeft: 10,
                    }}>
                    PKR <Text style={{fontWeight: 'bold'}}>300,000</Text>
                  </Text>
                  <Text style={{color: 'gray', paddingLeft: 10}}>
                    Gujranwala
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingBottom: 15,
                      height: 30,
                    }}>
                    <View
                      style={{
                        borderEndWidth: 1,
                        borderEndColor: 'gray',
                        paddingLeft: 10,
                        paddingRight: 5,
                      }}>
                      <Text style={{color: 'gray'}}>2017</Text>
                    </View>
                    <View
                      style={{
                        borderEndWidth: 1,
                        borderEndColor: 'gray',
                        paddingHorizontal: 5,
                      }}>
                      <Text style={{color: 'gray'}}>56,315 km</Text>
                    </View>
                    <View
                      style={{
                        borderEndColor: 'gray',
                        paddingHorizontal: 5,
                        borderLeftWidth: 0.2,
                      }}>
                      <Text style={{color: 'gray'}}>4-stroke</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{paddingTop: 15, paddingLeft: 10, flexDirection: 'row'}}>
              <View
                style={{
                  width: '80%',
                  backgroundColor: 'dodgerblue',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 7,
                  borderRadius: 5,
                }}>
                <Icon
                  name="star"
                  type="FontAwesome"
                  style={{fontSize: 13, color: 'white'}}
                />
                <Text style={{color: 'white', paddingLeft: 10, fontSize: 15}}>
                  Feature This Ad
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.RBSheet1.open()}
                activeOpacity={0.6}
                style={{width: '17%'}}>
                <View
                  style={{
                    backgroundColor: 'lightgray',
                    marginLeft: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 7,
                    borderRadius: 5,
                  }}>
                  <Icon
                    name="dots-three-horizontal"
                    type="Entypo"
                    style={{fontSize: 20, color: 'gray'}}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <Text style={{color: 'gray', paddingLeft: 10, paddingVertical: 8}}>
              Ad will expire in 45 days
            </Text>
          </View>
        </View> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          {this.createtable2()}
        </ScrollView>

        {/* Here Starts the RBSheet */}

        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          height={110}
          openDuration={200}
          customStyles={{
            container: {
              paddingVertical: 10,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{marginTop: 10}}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 20,
                    paddingBottom: 16,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'lightgray',
                  }}>
                  <Icon
                    name="pencil"
                    type="SimpleLineIcons"
                    color="white"
                    style={{fontSize: 20, color: 'gray'}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#232323',
                      fontWeight: 'bold',
                      marginLeft: 25,
                    }}>
                    Edit
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 20,
                    paddingTop: 15,
                  }}>
                  <Icon
                    name="delete"
                    type="AntDesign"
                    color="white"
                    style={{fontSize: 20, color: 'gray'}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#232323',
                      fontWeight: 'bold',
                      marginLeft: 25,
                    }}>
                    Remove
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

export default pakwheelsads;
