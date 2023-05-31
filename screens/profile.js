import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import products_screen from './products_screen';
import cart from './cart';
import orders from './orders';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class profile extends React.Component {
  logout = () => {
    AsyncStorage.removeItem('user');
    Actions.signin();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            width: width / 1.1,
            alignSelf: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: '27%',
                height: 90,
                borderRadius: 50,
                marginTop: 20,
              }}
              resizeMode="stretch"
              source={require('../assets/Sonam.jpg')}
            />

            <View style={{justifyContent: 'center'}}>
              <View
                style={{
                  marginTop: 10,
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}>
                  Random User
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Actions.update_profile()}
                style={{
                  marginLeft: 10,
                  marginTop: 5,
                  width: width / 1.1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: 'dodgerblue', paddingLeft: 5, fontSize: 17}}>
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

        <View style={{width: width / 1.1, alignSelf: 'center', marginTop: 25}}>
          <Text style={{color: 'gray', fontSize: 16}}>Personal</Text>
        </View>

        {/* List View starting here */}
        <TouchableOpacity
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingBottom: 15,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.3,
          }}
          onPress={() => Actions.cart()}>
          <Icon
            name="shoppingcart"
            type="AntDesign"
            style={{color: 'gray', fontSize: 18}}
          />

          <Text style={{color: 'black', fontSize: 16, width: '80%'}}>
            My Cart
          </Text>

          <Icon
            name="right"
            type="AntDesign"
            style={{color: 'gray', fontSize: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingBottom: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.3,
          }}
          onPress={() => Actions.orders()}>
          <Icon
            name="shoppingcart"
            type="AntDesign"
            style={{color: 'gray', fontSize: 18}}
          />

          <Text style={{color: 'black', fontSize: 16, width: '80%'}}>
            My Orders
          </Text>

          <Icon
            name="right"
            type="AntDesign"
            style={{color: 'gray', fontSize: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingBottom: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.3,
          }}
          onPress={() => Actions.orders()}>
          <Icon
            name="hearto"
            type="AntDesign"
            style={{color: 'gray', fontSize: 18}}
          />

          <Text style={{color: 'black', fontSize: 16, width: '80%'}}>
            Saved
          </Text>

          <Icon
            name="right"
            type="AntDesign"
            style={{color: 'gray', fontSize: 15}}
          />
        </TouchableOpacity>

        <View
          style={{width: width / 1.1, alignSelf: 'center', marginVertical: 20}}>
          <Text style={{color: 'gray', fontSize: 16}}>Products</Text>
        </View>

        <TouchableOpacity
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.3,
          }}
          onPress={() => Actions.orders()}>
          <Icon
            name="car"
            type="FontAwesome5"
            style={{color: 'gray', fontSize: 18}}
          />

          <Text style={{color: 'black', fontSize: 16, width: '80%'}}>Cars</Text>

          <Icon
            name="right"
            type="AntDesign"
            style={{color: 'gray', fontSize: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingBottom: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.3,
          }}
          onPress={() => Actions.orders()}>
          <Icon
            name="motorcycle"
            type="Fontisto"
            style={{color: 'gray', fontSize: 18}}
          />

          <Text style={{color: 'black', fontSize: 16, width: '80%'}}>
            Bikes
          </Text>

          <Icon
            name="right"
            type="AntDesign"
            style={{color: 'gray', fontSize: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingBottom: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.3,
          }}
          onPress={() => Actions.orders()}>
          <Icon
            name="ship-wheel"
            type="MaterialCommunityIcons"
            style={{color: 'gray', fontSize: 18}}
          />

          <Text style={{color: 'black', fontSize: 16, width: '80%'}}>
            Auto Parts
          </Text>

          <Icon
            name="right"
            type="AntDesign"
            style={{color: 'gray', fontSize: 15}}
          />
        </TouchableOpacity>

        <View
          style={{width: width / 1.1, alignSelf: 'center', marginVertical: 20}}>
          <Text style={{color: 'gray', fontSize: 16}}>Others</Text>
        </View>

        <TouchableOpacity
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 0.3,
          }}
          onPress={() => this.logout()}>
          <Icon
            name="power"
            type="Ionicons"
            style={{color: 'red', fontSize: 18}}
          />

          <Text style={{color: 'red', fontSize: 16, width: '90%'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default profile;
