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
import Home from '../screens/Home';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import {Call} from 'react-native-openanything';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class wheeldetails extends React.Component {
  call = () => {
    Call(this.props.phone).catch(err => console.error(err));
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
                    color: 'gray',
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

              <View
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
              </View>
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
                Petrol
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
                Automatic
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
              Local
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
              2497
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
              Sedan
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

          <View
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
          </View>

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
              marginTop: 15,
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <Icon
                name="speedometer"
                type="Ionicons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                ABS
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <Icon
                name="radio"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                AM/FM Radio
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="air-filter"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Air Conditioning
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="compact-disc"
                type="FontAwesome5"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                CD Player
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="disc-player"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                DVD Player
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="car-key"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Immobilizer Key
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="car-key"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Immobilizer Key
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="car-key"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Immobilizer Key
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="car-key"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Immobilizer Key
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="car-key"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Immobilizer Key
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                width: '50%',
              }}>
              <Icon
                name="car-key"
                type="MaterialCommunityIcons"
                style={{fontSize: 25, color: 'gray'}}
              />
              <Text style={{color: 'gray', fontSize: 15, paddingLeft: 10}}>
                Immobilizer Key
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
              width: width / 1.1,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
              Similar Ads
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{width: width / 1.1, alignSelf: 'center', marginBottom: 10}}>
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

            <View
              style={{
                width: width / 1.7,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'lightgray',
                marginLeft: 15,
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

            <View
              style={{
                width: width / 1.7,
                marginTop: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'lightgray',
                marginLeft: 15,
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
          </ScrollView>
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
      </View>
    );
  }
}

export default wheeldetails;
