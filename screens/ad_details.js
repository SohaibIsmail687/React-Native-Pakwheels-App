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
import ToggleSwitch from 'toggle-switch-react-native';
import pakwheelsads from '../screens/pakwheelsads';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class ad_details extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isOn2: false,
  //   };
  // }

  // toggle = isOn2 => {
  //   this.setState({
  //     isOn2: isOn2,
  //   });
  // };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              paddingTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontSize: 14}}>Chat Availbility</Text>
            <ToggleSwitch
              isOn={this.state.isOn2}
              onColor="#FE0000"
              offColor="#c6c5c5"
              // label="Example label"
              // labelStyle={{ color: "black", fontWeight: "900" }}
              size="small"
              onToggle={isOn2 => this.toggle(isOn2)}
            />
          </View> */}

          <View style={{width: width}}>
            <Image
              style={{width: '100%', height: 250, resizeMode: 'stretch'}}
              source={require('../assets/Toyota.jpg')}
            />

            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                position: 'absolute',
                top: 10,
              }}>
              <TouchableOpacity onPress={() => Actions.pakwheelsbottomtab()}>
                <Icon
                  name="left"
                  type="AntDesign"
                  style={{
                    color: 'gray',
                    fontSize: 23,
                    left: 10,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  marginLeft: 15,
                  width: '15%',
                  height: 28,
                  position: 'absolute',
                  bottom: 15,
                }}>
                <Text style={{color: 'white', fontSize: 15}}>1/1</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  bottom: 17,
                  width: width / 3.5,
                  right: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="eye"
                    type="Ionicons"
                    style={{
                      color: 'white',
                      fontSize: 15,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="search"
                    type="Ionicons"
                    style={{
                      color: 'white',
                      fontSize: 15,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="call"
                    type="Ionicons"
                    style={{
                      color: 'white',
                      fontSize: 15,
                    }}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      marginLeft: 5,
                    }}>
                    0
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#513203',
              alignItems: 'center',
              paddingVertical: 7,
            }}>
            <Text style={{color: 'white', fontSize: 15}}>
              Ad will expire in 45 days
            </Text>
          </View>

          <View
            style={{width: width / 1.1, alignSelf: 'center', marginTop: 10}}>
            <Text style={{color: 'black', fontSize: 20}}>Yamaha YBR 125</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingVertical: 2,
              }}>
              PKR 300,000
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 15,
              }}>
              Abubabakr Park, Gujranwala
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.25,
              alignSelf: 'center',
              paddingVertical: 25,
              justifyContent: 'space-between',
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
                2017
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
                56,315 Km
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
                4-stroke
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '32%',
                flexDirection: 'row',
                backgroundColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Icon
                name="pencil"
                type="MaterialCommunityIcons"
                style={{fontSize: 18}}
              />
              <Text style={{color: 'black', fontSize: 15, paddingLeft: 7}}>
                Edit
              </Text>
            </View>

            <View
              style={{
                width: '32%',
                flexDirection: 'row',
                backgroundColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Icon
                name="delete"
                type="MaterialCommunityIcons"
                style={{fontSize: 18}}
              />
              <Text style={{color: 'black', fontSize: 15, paddingLeft: 7}}>
                Remove
              </Text>
            </View>

            <View
              style={{
                width: '32%',
                flexDirection: 'row',
                backgroundColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Icon
                name="share-variant"
                type="MaterialCommunityIcons"
                style={{fontSize: 18}}
              />
              <Text style={{color: 'black', fontSize: 15, paddingLeft: 7}}>
                Share
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: 'gray',
              fontSize: 18,
              fontWeight: 'bold',
              width: '90%',
              alignSelf: 'center',
              textAlign: 'center',
              paddingTop: 10,
            }}
            numberOfLines={2}>
            Sell your car faster by using our valuable services
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 1.05,
              backgroundColor: 'white',
              alignSelf: 'center',
              borderColor: 'lightgray',
              borderWidth: 0.5,
              borderRadius: 5,
              marginTop: 20,
              paddingLeft: 10,
              paddingVertical: 12,
              shadowOffset: 5,
              shadowOpacity: 5,
              shadowColor: 'gray',
              elevation: 5,
            }}>
            <View
              style={{
                width: '15%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'maroon',
                height: 50,
                borderRadius: 50,
              }}>
              <Icon
                name="star"
                type="FontAwesome"
                style={{color: 'white', fontSize: 25}}
              />
            </View>

            <View style={{width: '100%', paddingLeft: 10}}>
              <View style={{width: '80%'}}>
                <Text
                  style={{color: 'black', fontWeight: 'bold'}}
                  numberOfLines={2}>
                  Sell 10x faster and get your ad noticed by 50 lac+ buyers.
                </Text>

                <Text style={{color: 'black'}} numberOfLines={2}>
                  Feature Your Ads to get more Calls
                </Text>
              </View>

              <View
                style={{
                  width: '80%',
                  paddingLeft: 10,
                  marginTop: 10,
                  backgroundColor: '#fcd4d4',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderRadius: 5,
                }}>
                <Text style={{color: '#fc6c6c', fontWeight: 'bold'}}>
                  Feature This Ad
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ad_details;
