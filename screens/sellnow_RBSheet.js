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
import sale_car from '../screens/sale_car';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class sellnow_RBSheet extends React.Component {
  componentDidMount = async () => {
    this.RBSheet1.open();
  };

  cross_screen = () => {
    this.RBSheet1.close();
    Actions.pakwheelsbottomtab();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          height={220}
          openDuration={200}
          customStyles={{
            container: {
              paddingVertical: 5,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}>
          <View>
            <View style={{marginTop: 5}}>
              <TouchableOpacity onPress={() => this.cross_screen()}>
                <View
                  style={{
                    width: width / 7.8,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    marginRight: 10,
                    paddingVertical: 4,
                    backgroundColor: '#e5e5e5',
                    borderRadius: 50,
                  }}>
                  <Icon
                    name="cross"
                    type="Entypo"
                    style={{fontSize: 35, color: '#3a3939'}}
                  />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  color: '#3a3939',
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingTop: 10,
                }}>
                What do you want to sell?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  width: width / 1.4,
                  alignSelf: 'center',
                  marginVertical: 25,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => Actions.sale_car()}>
                  <View
                    style={{
                      alignItems: 'center',
                      width: width / 4,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#e5e5e5',
                        width: '55%',
                        alignItems: 'center',
                        paddingVertical: 10,
                        borderRadius: 50,
                      }}>
                      <Icon
                        name="car"
                        type="FontAwesome5"
                        color="white"
                        style={{fontSize: 25, color: 'black'}}
                      />
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        color: '#232323',
                        fontWeight: 'bold',
                        paddingTop: 5,
                      }}>
                      Car
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                      width: width / 4,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#e5e5e5',
                        width: '55%',
                        alignItems: 'center',
                        paddingVertical: 10,
                        borderRadius: 50,
                      }}>
                      <Icon
                        name="motorcycle"
                        type="Fontisto"
                        color="white"
                        style={{fontSize: 25, color: 'black'}}
                      />
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        color: '#232323',
                        fontWeight: 'bold',
                        paddingTop: 5,
                      }}>
                      Bike
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Actions.sale_auto_parts()}>
                  <View
                    style={{
                      alignItems: 'center',
                      width: width / 4,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#e5e5e5',
                        width: '55%',
                        alignItems: 'center',
                        paddingVertical: 10,
                        borderRadius: 50,
                      }}>
                      <Icon
                        name="ship-wheel"
                        type="MaterialCommunityIcons"
                        color="white"
                        style={{fontSize: 25, color: 'black'}}
                      />
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        color: '#232323',
                        fontWeight: 'bold',
                        paddingTop: 5,
                      }}>
                      Auto parts
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

export default sellnow_RBSheet;
