import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class pakwheelsads extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data5: [],
      skalton: true,
      ad_status: 'active',
      text1: 2,
      text2: 1,
      text3: 1,
      id_for_remove_ad: '',
      id_for_reactivate: '',
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
    };
  }

  Rbsheet_open = (
    value,
    val2,
    val3,
    val4,
    val5,
    val6,
    val7,
    val8,
    val9,
    val10,
    val11,
    val12,
  ) => {
    this.RBSheet1.open();
    console.log('Addddddddd Idddddd', value);
    this.setState({
      id_for_remove_ad: value,
      userid: val2,
      location: val3,
      model: val4,
      RegisteredIn: val5,
      color: val6,
      kmsdriven: val7,
      price: val8,
      description: val9,
      name: val10,
      mobile: val11,
      img: val12,
    });
  };

  Edit_Ads = () => {
    this.RBSheet1.close();

    Actions.Edit_My_Ads({
      id_for_remove_ad: this.state.id_for_remove_ad,
      userid: this.state.userid,
      location: this.state.location,
      model: this.state.model,
      RegisteredIn: this.state.RegisteredIn,
      color: this.state.color,
      kmsdriven: this.state.kmsdriven,
      price: this.state.price,
      description: this.state.description,
      name1: this.state.name,
      mobile: this.state.mobile,
      img: this.state.img,
    });
  };

  Remove_Ads = () => {
    this.RBSheet1.close();
    let uploaddata = new FormData();

    uploaddata.append('ad_remove', this.state.id_for_remove_ad);

    let api = Connection + 'restapi.php?action=remove_ad';
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
        let table = [];
        let record = response.response;
        let len = record.length;
        console.log('resssssssssssssssssssssss', record);

        if (record != 'fail') {
          this.My_Ads();
          console.log(record);
        } else {
          this.setState({});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  changebtn(value, val) {
    this.setState({
      ad_status: val,
      skalton: true,
    });

    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,

        [value]: 2,
      });
    } else {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,

        [value]: 2,
      });
    }
    setTimeout(() => {
      this.My_Ads();
    }, 100);
  }

  reactivate_ad = val => {
    let uploaddata = new FormData();
    console.log('Reactivateeeeeeeeeeeee IDDDD', val);

    uploaddata.append('reactivate_ad', val);

    let api = Connection + 'restapi.php?action=reactivate_ad';
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
        let record = response.response;
        console.log('resssssssssssssssssssssssponse', record);

        if (record != 'fail') {
          this.My_Ads();
          console.log(record);
        } else {
          this.setState({
            data5: [],
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

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
    let uploaddata = new FormData();

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('ad_status', this.state.ad_status);

    let api = Connection + 'restapi.php?action=My_Ads';
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
        let table = [];
        let record = response.response;
        let len = record.length;
        console.log('resssssssssssssssssssssss', record);

        if (record != 'fail') {
          this.setState({
            data5: record,
            skalton: false,
          });
          console.log(record);
        } else {
          this.setState({
            data5: [],
            skalton: false,
          });
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

    console.log(len);

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
        let status = record1[i].status;
        console.log('stattttttttttttttttuuuuuuuuusssssssss', status);
        table.push(
          <View>
            {
              <View>
                {status == 'active' && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      Actions.ad_details({
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
                                <Text style={{fontWeight: 'bold'}}>
                                  {price}
                                </Text>
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
                            onPress={() =>
                              this.Rbsheet_open(
                                id,
                                userid,
                                location,
                                model,
                                registeredIn,
                                color,
                                kms,
                                price,
                                desc,
                                name,
                                phone,
                                profile,
                              )
                            }
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
                )}

                {status == 'removed' && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      Actions.ad_details({
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
                                <Text style={{fontWeight: 'bold'}}>
                                  {price}
                                </Text>
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
                            paddingBottom: 10,
                            paddingLeft: 10,
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              width: '48%',
                              backgroundColor: 'lightgray',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingVertical: 3,
                              borderRadius: 5,
                            }}>
                            <Icon
                              name="pencil"
                              type="MaterialCommunityIcons"
                              style={{fontSize: 20, color: 'black'}}
                            />
                            <Text
                              style={{
                                color: 'black',
                                paddingLeft: 10,
                                fontSize: 15,
                              }}>
                              Edit
                            </Text>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              this.reactivate_ad(id);
                            }}
                            activeOpacity={0.6}
                            style={{width: '48%'}}>
                            <View
                              style={{
                                backgroundColor: 'dodgerblue',
                                marginLeft: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 7,
                                borderRadius: 5,
                                flexDirection: 'row',
                              }}>
                              <Icon
                                name="repeat"
                                type="FontAwesome"
                                style={{fontSize: 15, color: 'white'}}
                              />
                              <Text
                                style={{
                                  color: 'white',
                                  paddingLeft: 10,
                                  fontSize: 15,
                                }}>
                                Re-Activate
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
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

        <View
          style={{
            width: width,
            backgroundColor: '#2597CB',
            alignSelf: 'center',
            height: 45,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
          }}>
          <TouchableOpacity
            style={{width: '33%'}}
            onPress={() => this.changebtn('text1', 'active')}>
            <View
              style={
                this.state.text1 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                style={
                  this.state.text1 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Active
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '33%'}}
            onPress={() => this.changebtn('text2', 'pending')}>
            <View
              style={
                this.state.text2 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                style={
                  this.state.text2 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Pending
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '33%'}}
            onPress={() => this.changebtn('text3', 'removed')}>
            <View
              style={
                this.state.text3 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                style={
                  this.state.text3 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Removed
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.skalton == true ? (
          <SkeletonPlaceholder>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 5,
                backgroundColor: 'white',
                marginTop: 20,
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
                marginBottom: 15,
              }}></View>
          </SkeletonPlaceholder>
        ) : (
          <ScrollView>
            {this.state.data5 == '' ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: height / 1.5,
                }}>
                <Text style={{color: 'black'}}>You don't have any ads.</Text>
              </View>
            ) : (
              <View style={{paddingBottom: 10, marginTop: 10}}>
                {this.createtable2()}
              </View>
            )}
          </ScrollView>
        )}

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
              <TouchableOpacity onPress={() => this.Edit_Ads()}>
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

              <TouchableOpacity onPress={() => this.Remove_Ads()}>
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

const styles = StyleSheet.create({
  active_button: {
    width: '100%',
    height: 45,
    // backgroundColor: '#2597CB',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderColor: 'white',
  },

  in_active_button: {
    width: width / 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderColor: '#2597CB',
  },

  active_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  in_active_text: {
    color: '#504F54',
  },
});

export default pakwheelsads;
