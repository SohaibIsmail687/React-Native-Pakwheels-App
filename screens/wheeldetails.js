import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
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
import pakwheelsbottomtab from '../screens/pakwheelsbottomtab';
import Home from '../screens/Home';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import {Call} from 'react-native-openanything';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Connection from '../connection';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class wheeldetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      my_like: false,
      data5: [],
      show: false,
    };
  }

  componentDidMount = async () => {
    var features = JSON.parse(this.props.features);
    console.log(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      features,
    );

    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    // console.log('Local Storage Data', user);
    let id = parsed[0].id;
    this.setState({
      id: id,
      data5: features,
    });
    this.get_liked_ad();
  };

  call = () => {
    Call(this.props.phone).catch(err => console.error(err));
  };

  show_more = () => {
    this.setState({
      show: true,
    });
  };

  show_less = () => {
    this.setState({
      show: false,
    });
  };

  get_liked_ad = () => {
    let uploaddata = new FormData();
    uploaddata.append('ad_id', this.props.id);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'restapi.php?action=get_liked_ad';

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
        console.log('Record Responseeeeeeeeeeee', response);
        if (record != 'fail') {
          this.setState({
            my_like: true,
            spinner: false,
          });
        } else {
          this.setState({
            my_like: false,
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Like_Station = () => {
    this.setState({
      my_like: true, //unlike the ad next time
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('ad_id', this.props.id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'restapi.php?action=ad_like';

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
        if (record != 'fail') {
          this.get_liked_ad();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Unlike_Station = () => {
    this.setState({
      my_like: false, //Like the ad next time
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('ad_id', this.props.id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'restapi.php?action=ad_unlike';

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
        if (record != 'fail') {
          this.get_liked_ad();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  feature_list = () => {
    let table = [];
    let record = this.state.data5;
    let len = record.length;
    // console.log('lengthhhhhhhhhhhhhhhhhhhh', len)
    if (record != 'fail') {
      for (let i = 0; i < len; i++) {
        let features = record[i];
        // console.log('lengthhhhhhhhhhhhhhhhhhhh featuresssssssssssssssss', features)

        table.push(
          <View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: width / 2.5,
                }}>
                <Icon
                  name="circle"
                  type="FontAwesome"
                  style={{fontSize: 10, color: 'gray'}}
                />
                <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                  {features}
                </Text>
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width: width}}>
            <ImageLoad
              style={{width: '100%', height: 250, resizeMode: 'stretch'}}
              loadingStyle={{size: 'large', color: 'blue'}}
              source={{uri: this.props.profile}}
              placeholderStyle={{width: '100%', height: 250}}
            />
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                position: 'absolute',
                top: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => Actions.pakwheelsbottomtab()}>
                <Icon
                  name="left"
                  type="AntDesign"
                  style={{
                    color: 'maroon',
                    fontSize: 23,
                    left: 10,
                  }}
                />
              </TouchableOpacity>
              <Icon
                name="star-box"
                type="MaterialCommunityIcons"
                style={{
                  color: 'maroon',
                  fontSize: 30,
                  right: -5,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  marginLeft: 15,
                  width: '17%',
                  height: 28,
                }}>
                <Text style={{color: 'white', fontSize: 15}}>1/15</Text>
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  width: '12%',
                  height: 40,
                  marginLeft: 160,
                }}>
                <Icon
                  name="share"
                  type="Fontisto"
                  style={{
                    color: 'black',
                    fontSize: 18,
                  }}
                />
              </View>

              {this.state.my_like == false ? (
                <TouchableOpacity
                  onPress={() => this.Like_Station()}
                  style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    width: '12%',
                    height: 40,
                    marginLeft: 20,
                  }}>
                  <Icon
                    name="heart"
                    type="AntDesign"
                    style={{
                      color: 'lightgray',
                      fontSize: 21,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.Unlike_Station()}
                  style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    width: '12%',
                    height: 40,
                    marginLeft: 20,
                  }}>
                  <Icon
                    name="heart"
                    type="AntDesign"
                    style={{
                      color: 'red',
                      fontSize: 21,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{width: width / 1.1, alignSelf: 'center', marginTop: 10}}>
            <Text style={{color: 'black', fontSize: 20}}>
              {this.props.name1}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingVertical: 2,
              }}>
              PKR {this.props.price}
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 15,
              }}>
              Faisal Town, {this.props.location}
            </Text>
          </View>

          <View
            style={{
              width: width / 1.1,
              backgroundColor: 'white',
              alignSelf: 'center',
              alignItems: 'center',
              borderColor: 'lightgray',
              borderWidth: 0.5,
              borderRadius: 5,
              marginTop: 20,
              paddingVertical: 12,
              shadowOffset: 5,
              shadowOpacity: 5,
              shadowColor: 'lightgray',
              elevation: 5,
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 15,
                textDecorationLine: 'underline',
              }}>
              Inspection Rating
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="star"
                type="Fontiso"
                style={{fontSize: 18, color: 'gold'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 5}}>
                10.0/10
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              paddingVertical: 25,
              justifyContent: 'space-between',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Icon
                name="calendar"
                type="AntDesign"
                style={{fontSize: 22, color: 'dodgerblue'}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingTop: 5,
                }}>
                {this.props.model}
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Icon
                name="speedometer"
                type="SimpleLineIcons"
                style={{fontSize: 22, color: 'dodgerblue'}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingTop: 5,
                }}>
                {this.props.kms} Km
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Icon
                name="local-gas-station"
                type="MaterialIcons"
                style={{fontSize: 25, color: 'dodgerblue'}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingTop: 5,
                }}>
                {this.props.fuel}
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Icon
                name="dingding"
                type="AntDesign"
                style={{fontSize: 25, color: 'dodgerblue'}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingTop: 5,
                }}>
                {this.props.transmission}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              paddingVertical: 8,
              justifyContent: 'space-between',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#b2b2b2',
                fontSize: 15,
                paddingTop: 5,
              }}>
              Registered In
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              {this.props.registeredIn}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              paddingVertical: 8,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#b2b2b2',
                fontSize: 15,
                paddingTop: 5,
              }}>
              Exterior Color
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              {this.props.color}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              paddingVertical: 8,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#b2b2b2',
                fontSize: 15,
                paddingTop: 5,
              }}>
              Assembly
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              {this.props.assembly}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              paddingVertical: 8,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#b2b2b2',
                fontSize: 15,
                paddingTop: 5,
              }}>
              Engine Capacity
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              {this.props.engine}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              paddingVertical: 8,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#b2b2b2',
                fontSize: 15,
                paddingTop: 5,
              }}>
              Body Type
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              {this.props.assembly}
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 15,
              marginTop: 20,
              borderBottomWidth: 0.5,
              borderBottomColor: 'lightgray',
              marginBottom: 10,
              paddingBottom: 10,
            }}>
            <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold'}}>
              Seller Comments
            </Text>

            {this.state.show == true ? (
              <View>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 15,
                    paddingLeft: 5,
                  }}>
                  - Model {this.props.model}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - color {this.props.color}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - {this.props.kms}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - {this.props.desc}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - Price PKR {this.props.price}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - Model {this.props.model}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - Registered {this.props.registeredIn}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - 2 keys
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 15,
                    paddingLeft: 5,
                  }}>
                  - Model {this.props.model}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - color {this.props.color}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - {this.props.kms}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - {this.props.desc}
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontSize: 15,
                    paddingTop: 2,
                    paddingLeft: 5,
                  }}>
                  - Price PKR {this.props.price}
                </Text>
              </View>
            )}
          </View>

          {this.state.show == true ? (
            <TouchableOpacity
              onPress={() => this.show_less()}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'dodgerblue', fontSize: 17}}>Show Less</Text>
              <Icon
                name="down"
                type="AntDesign"
                style={{color: 'dodgerblue', fontSize: 15, paddingLeft: 5}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.show_more()}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'dodgerblue', fontSize: 17}}>Show More</Text>
              <Icon
                name="down"
                type="AntDesign"
                style={{color: 'dodgerblue', fontSize: 15, paddingLeft: 5}}
              />
            </TouchableOpacity>
          )}

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Features
            </Text>
          </View>

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              flexWrap: 'wrap',
              marginBottom: 10,
            }}>
            {this.feature_list()}
          </View>
        </ScrollView>
        <View
          style={{
            width: width / 1,
            paddingHorizontal: 10,
            flexDirection: 'row',
            paddingVertical: 10,
            borderTopWidth: 0.5,
            borderTopColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => this.call()}
            style={{
              flexDirection: 'row',
              backgroundColor: 'dodgerblue',
              alignItems: 'center',
              justifyContent: 'center',
              width: '27%',
              height: 50,
              borderRadius: 5,
            }}>
            <Icon
              name="call"
              type="MaterialIcons"
              style={{color: 'white', fontSize: 20}}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 5,
              }}>
              Call
            </Text>
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '15%',
              height: 50,
              borderRadius: 5,
              borderColor: 'dodgerblue',
              borderWidth: 1.5,
            }}>
            <Icon
              name="whatsapp"
              type="FontAwesome"
              style={{color: 'green', fontSize: 30}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '27%',
              height: 50,
              borderRadius: 5,
              borderColor: 'dodgerblue',
              borderWidth: 1.5,
            }}>
            <Icon
              name="chatbox-ellipses-outline"
              type="Ionicons"
              style={{color: 'dodgerblue', fontSize: 20}}
            />
            <Text
              style={{
                color: 'dodgerblue',
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 5,
              }}>
              SMS
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '27%',
              height: 50,
              borderRadius: 5,
              borderColor: 'dodgerblue',
              borderWidth: 1.5,
            }}>
            <Icon
              name="chat"
              type="MaterialIcons"
              style={{color: 'dodgerblue', fontSize: 20}}
            />
            <Text
              style={{
                color: 'dodgerblue',
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 5,
              }}>
              Chat
            </Text>
          </View>
        </View>

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
              <UIActivityIndicator style={{}} color="gray" />
              <Text
                style={{
                  fontSize: 16,
                  color: 'gray',
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

export default wheeldetails;
