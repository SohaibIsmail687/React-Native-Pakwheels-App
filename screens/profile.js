import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import products_screen from './products_screen';
import cart from './cart';
import orders from './orders';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class profile extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: 'whitesmoke',
            borderBottomColor: 'lightgrey',
            borderBottomWidth: 0.3,
            width: width,
            height: 200,
            paddingLeft: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: width / 4, paddingVertical: 55}}>
              <Image
                style={{width: '100%', height: 90, borderRadius: 50}}
                source={require('../assets/Sonam.jpg')}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <View
                style={{
                  paddingLeft: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                    width: '65%',
                  }}
                  numberOfLines={1}>
                  Sonam Bajwa
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Actions.update_profile()}
                style={{
                  marginLeft: 20,
                  marginTop: 5,
                  width: width / 1.1,
                  // height: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: 'dodgerblue', paddingLeft: 5, fontSize: 18}}>
                  View Profile
                </Text>
                <Icon
                  name="right"
                  type="AntDesign"
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'dodgerblue',
                    paddingLeft: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* List View starting here */}
        <View style={{marginTop: 20, marginLeft: 20, width: width}}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => Actions.cart()}>
            <View
              style={{
                backgroundColor: 'maroon',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="bell"
                type="MaterialCommunityIcons"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{}}>
                <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                  My Cart
                </Text>
              </View>
              <View style={{marginLeft: 170}}>
                <Icon
                  name="right"
                  type="AntDesign"
                  style={{color: 'grey', fontSize: 15}}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* Payment method */}

          <TouchableOpacity
            onPress={() => Actions.orders()}
            style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={{
                backgroundColor: 'skyblue',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="comment-dollar"
                type="FontAwesome5"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                My Orders
              </Text>
            </View>
            <View style={{justifyContent: 'center', paddingLeft: 140}}>
              <Icon
                name="right"
                type="AntDesign"
                style={{color: 'grey', fontSize: 15}}
              />
            </View>
          </TouchableOpacity>

          {/* Reward Credits */}

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={{
                backgroundColor: 'dodgerblue',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="crown"
                type="MaterialCommunityIcons"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                Saved
              </Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 150}}>
              <Icon
                name="right"
                type="AntDesign"
                style={{color: 'grey', fontSize: 15}}
              />
            </View>
          </View>

          {/* My Promo Code */}

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={{
                backgroundColor: 'orange',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="qrcode"
                type="FontAwesome"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                Cars
              </Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 145}}>
              <Icon
                name="right"
                type="AntDesign"
                style={{color: 'grey', fontSize: 15}}
              />
            </View>
          </View>

          {/* Setting */}

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={{
                backgroundColor: 'black',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="settings-sharp"
                type="Ionicons"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                Bikes
              </Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 200}}>
              <Icon
                name="right"
                type="AntDesign"
                style={{color: 'grey', fontSize: 15}}
              />
            </View>
          </View>

          {/* Invite Friends */}

          <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 20}}
            onPress={() => Actions.products_screen()}>
            <View
              style={{
                backgroundColor: 'green',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="user-friends"
                type="FontAwesome5"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                Auto Parts
              </Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 160}}>
              <Icon
                name="right"
                type="AntDesign"
                style={{color: 'grey', fontSize: 15}}
              />
            </View>
          </TouchableOpacity>

          {/* Help Centre */}

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={{
                backgroundColor: 'gold',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="headphone"
                type="Fontisto"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                Logout
              </Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 175}}>
              <Icon
                name="right"
                type="AntDesign"
                style={{color: 'grey', fontSize: 15}}
              />
            </View>
          </View>

          {/* About Us*/}

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View
              style={{
                backgroundColor: 'dodgerblue',
                width: width / 10.5,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6,
              }}>
              <Icon
                name="exclamationcircle"
                type="AntDesign"
                style={{color: 'white', fontSize: 20}}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: 'black', fontSize: 16, paddingLeft: 20}}>
                About Us
              </Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 190}}>
              <Icon
                name="right"
                type="AntDesign"
                style={{color: 'grey', fontSize: 15}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default profile;
