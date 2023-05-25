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
import wheeldetails from '../screens/wheeldetails';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import Connection from '../connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageLoad from 'react-native-image-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data5: [],
    };
  }

  logout = () => {
    AsyncStorage.removeItem('user');
    Actions.signin();
  };

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
    this.All_Ad();
  };

  All_Ad = () => {
    let uploaddata = new FormData();
    uploaddata.append('user_id', this.state.id);

    // console.log ('AAAAAAAAAALLLLLLLLLLLLLLL ADDDDDDDDDDDDDD Id', this.state.id)

    let api = Connection + 'restapi.php?action=All_Ad';
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

  createtable1 = () => {
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
                    id:id,
                    userid:userid,
                    location:location,
                    model:model,
                    registeredIn:registeredIn,
                    color:color,
                    kms:kms,
                    price: price,
                    desc:desc,
                    name1: name,
                    phone:phone,
                    profile:profile,
                    
                  })
                }>
                <View
                  style={{
                    width: width / 1.7,
                    marginTop: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: 'lightgray',
                    marginRight:5,
                  }}>
                  <ImageLoad
                    style={{
                      width: '100%',
                      height: 160,
                      resizeMode: 'stretch',
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={10}
                    placeholderStyle={{
                      width: '100%',
                      height: 160,
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 15,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    {name}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 17,
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}>
                    PKR <Text style={{fontWeight: 'bold'}}>{price}</Text>
                  </Text>
                  <Text style={{color: 'gray', paddingLeft: 10, paddingTop: 7}}>
                    {location}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingBottom: 15,
                      paddingTop: 5,
                      height: 40,
                    }}>
                    <View
                      style={{
                        borderEndWidth: 1,
                        borderEndColor: 'gray',
                        paddingHorizontal: 10,
                      }}>
                      <Text style={{color: 'gray'}}>{model}</Text>
                    </View>
                    <View
                      style={{
                        borderEndWidth: 1,
                        borderEndColor: 'gray',
                        paddingHorizontal: 10,
                      }}>
                      <Text style={{color: 'gray'}}>{kms}</Text>
                    </View>
                    <View
                      style={{
                        borderEndWidth: 1,
                        borderEndColor: 'gray',
                        paddingHorizontal: 10,
                      }}>
                      <Text style={{color: 'gray'}}>{color}</Text>
                    </View>
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#064189',
              paddingVertical: 15,
              paddingHorizontal: 20,
            }}>
            <ScrollView
              style={{flexDirection: 'row'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => this.logout()}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  marginRight: 8,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#056ab7',
                    fontSize: 13,
                    paddingHorizontal: 15,
                  }}>
                  Used Cars
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: '#056ab7',
                  borderRadius: 20,
                  marginHorizontal: 8,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    paddingHorizontal: 15,
                  }}>
                  New Cars
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#056ab7',
                  borderRadius: 20,
                  marginHorizontal: 8,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    paddingHorizontal: 15,
                  }}>
                  Bikes
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#056ab7',
                  borderRadius: 20,
                  marginHorizontal: 8,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    paddingHorizontal: 15,
                  }}>
                  Auto Parts
                </Text>
              </View>
            </ScrollView>

            <View
              style={{
                width: width / 1.2,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TextInput
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  height: 43,
                  borderRadius: 5,
                  paddingLeft: 40,
                  color: 'darkgrey',
                  backgroundColor: 'white',
                  fontSize: 16,
                }}
                placeholder="Search Used Cars"
                placeholderTextColor="darkgrey"
              />
              <Icon
                name="search"
                type="Ionicons"
                style={{
                  color: 'dodgerblue',
                  fontSize: 20,
                  position: 'absolute',
                  left: 10,
                }}
              />

              <Icon
                name="md-location-sharp"
                type="Ionicons"
                style={{
                  color: 'black',
                  fontSize: 15,
                  position: 'absolute',
                  right: 70,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  position: 'absolute',
                  right: 20,
                }}>
                All Cities
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 20,
              width: width / 1.1,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 22}}>
              Browse Used Cars
            </Text>

            <ScrollView
              style={{
                paddingVertical: 15,
                borderBottomWidth: 0.3,
                borderColor: 'lightgray',
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                }}>
                <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 15}}>
                  Category
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingLeft: 20,
                  }}>
                  Budget
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingLeft: 20,
                  }}>
                  Brand
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingLeft: 20,
                  }}>
                  Model
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingLeft: 20,
                  }}>
                  Cities
                </Text>

                <Text
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingLeft: 20,
                  }}>
                  Body Types
                </Text>
              </View>
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 20,
                  marginRight: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  shadowOffset: 5,
                  shadowOpacity: 5,
                  shadowColor: 'gray',
                  elevation: 5,
                }}>
                <Icon
                  name="steering"
                  type="MaterialCommunityIcons"
                  style={{
                    color: 'gray',
                    fontSize: 25,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Family Cars
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 20,
                  marginHorizontal: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  //   shadowOffset: 5,
                  //   shadowOpacity: 5,
                  //   shadowColor: 'gray',
                  //   elevation: 1,
                }}>
                <Icon
                  name="dingding"
                  type="AntDesign"
                  style={{
                    color: 'gray',
                    fontSize: 25,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Automatic Cars
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 20,
                  marginHorizontal: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  //   shadowOffset: 5,
                  //   shadowOpacity: 5,
                  //   shadowColor: 'gray',
                  //   elevation: 1,
                }}>
                <Icon
                  name="truck-monster"
                  type="FontAwesome5"
                  style={{
                    color: 'gray',
                    fontSize: 25,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Big Cars
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 20,
                  marginHorizontal: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  //   shadowOffset: 5,
                  //   shadowOpacity: 5,
                  //   shadowColor: 'gray',
                  //   elevation: 1,
                }}>
                <Icon
                  name="car-side"
                  type="MaterialCommunityIcons"
                  style={{
                    color: 'gray',
                    fontSize: 30,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Small Cars
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: width / 1.1,
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 5,
                  marginRight: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  //   shadowOffset: 5,
                  //   shadowOpacity: 5,
                  //   shadowColor: 'gray',
                  //   elevation: 1,
                }}>
                <Icon
                  name="steering"
                  type="MaterialCommunityIcons"
                  style={{
                    color: 'gray',
                    fontSize: 25,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Old Cars
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 5,
                  marginHorizontal: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  //   shadowOffset: 5,
                  //   shadowOpacity: 5,
                  //   shadowColor: 'gray',
                  //   elevation: 1,
                }}>
                <Icon
                  name="dingding"
                  type="AntDesign"
                  style={{
                    color: 'gray',
                    fontSize: 25,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Imported Cars
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 5,
                  marginHorizontal: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  //   shadowOffset: 5,
                  //   shadowOpacity: 5,
                  //   shadowColor: 'gray',
                  //   elevation: 1,
                }}>
                <Icon
                  name="truck-monster"
                  type="FontAwesome5"
                  style={{
                    color: 'gray',
                    fontSize: 25,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  1000cc Cars
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '23.5%',
                  height: 110,
                  marginTop: 5,
                  marginHorizontal: 3,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  //   shadowOffset: 5,
                  //   shadowOpacity: 5,
                  //   shadowColor: 'gray',
                  //   elevation: 1,
                }}>
                <Icon
                  name="car-side"
                  type="MaterialCommunityIcons"
                  style={{
                    color: 'gray',
                    fontSize: 30,
                  }}
                />
                <Text
                  style={{
                    color: 'gray',
                    paddingTop: 8,
                    fontSize: 12,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  1300cc Cars
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 22,
                paddingTop: 20,
              }}>
              Public Ads
            </Text>
            <ScrollView
              style={{}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.createtable1()}
            </ScrollView>

            {/* <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
                Featured Used Cars
              </Text>
              <Text style={{color: 'blue'}}>View All</Text>
            </View>

            <ScrollView
              style={{width: width / 1.1, alignSelf: 'center'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  width: width / 1.7,
                  marginTop: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: 'lightgray',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: 160,
                    resizeMode: 'stretch',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  source={require('../assets/Toyota.jpg')}
                />
                <Icon
                  name="star-box"
                  type="MaterialCommunityIcons"
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: -5,
                    color: 'maroon',
                    fontSize: 30,
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                    paddingLeft: 10,
                    paddingTop: 5,
                  }}>
                  Hyundai Elantra 2022
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 17,
                    paddingLeft: 10,
                    paddingTop: 5,
                  }}>
                  PKR <Text style={{fontWeight: 'bold'}}>69.3 lacs</Text>
                </Text>
                <Text style={{color: 'gray', paddingLeft: 10, paddingTop: 7}}>
                  Lahore
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 15,
                    paddingTop: 5,
                    height: 40,
                  }}>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderEndColor: 'gray',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: 'gray'}}>2022</Text>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderEndColor: 'gray',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: 'gray'}}>82 km</Text>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderEndColor: 'gray',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: 'gray'}}>petrol</Text>
                  </View>
                </View>
              </View>
            </ScrollView> */}
          </View>
        </ScrollView>

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

export default Home;
