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

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class pakwheelsads extends React.Component {
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
        </View>

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
