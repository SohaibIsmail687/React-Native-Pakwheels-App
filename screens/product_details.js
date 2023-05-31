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
import products_screen from './products_screen';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import ImageLoad from 'react-native-image-placeholder';
import {Call} from 'react-native-openanything';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';

import Connection from '../connection';
import profile from './profile';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class product_details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      my_like: false,
      data5: [],
      cart_array: [],
      show: false,
      cart_button: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      cart_array: this.props.cart,
    });

    if (this.props.cart == '') {
      console.log('iffffffffffffffffffffffffffffffffffffff');
    } else {
      let record = this.props.cart;
      let len = this.props.cart.length;

      console.log('length of reduxxxxxxxxxxxxxxxxx', len);

      for (let i = 0; i < len; i++) {
        let id = record[i].p_id;
        // console.log('Reduxxxxxxxxxxxxx Idddddddddddddd', id);

        if (id == this.props.id) {
          this.setState({
            cart_button: true,
          });
        }
      }
    };

    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    // console.log('Local Storage Data', user);
    let id = parsed[0].id;
    this.setState({
      id: id,
      //   data5: features,
    });
    // this.get_liked_ad();

    console.log(
      'imaggggggggggggggggggggggggggeeeeeeeeeeeee',
      this.props.profile,
    );
  };

  add_cart = () => {
    let obj = {
      p_name: this.props.title,
      p_id: this.props.id,
      p_price: this.props.price,
      fixed_price:this.props.price,
      p_profile: this.props.profile,
      p_quantity:1
    };
    // console.log(obj)

    this.state.cart_array.push(obj);

    this.props.add_cart(this.state.cart_array);

    setTimeout(() => {
      console.log('aaaaaaaaaaaaaaaaaa', this.props.cart);

      Actions.cart();
    }, 100);
  };


  dd = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

<NavigationEvents onDidFocus={payload => this.dd()} />

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
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Icon
                  name="left"
                  type="AntDesign"
                  style={{
                    color: 'white',
                    fontSize: 23,
                    left: 10,
                  }}
                />
              </TouchableOpacity>

              <Text style={{color: 'white', fontSize: 20, width: '70%'}}>
                {this.props.title}
              </Text>

              <Icon
                name="shopping-cart"
                type="Entypo"
                style={{
                  color: 'white',
                  fontSize: 23,
                  right: 10,
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
                  //   onPress={() => this.Like_Station()}
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
                  //   onPress={() => this.Unlike_Station()}
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
              {this.props.title}
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
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 10,
              paddingVertical: 8,
              justifyContent: 'space-between',
              borderTopColor: 'lightgray',
              borderTopWidth: 0.5,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#b2b2b2',
                fontSize: 15,
                paddingTop: 5,
              }}>
              Category
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              {this.props.category}
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
              Last Updated
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              27 May 2023
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
              //   borderBottomColor: 'lightgray',
              //   borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                color: '#b2b2b2',
                fontSize: 15,
                paddingTop: 5,
              }}>
              Ad ID
            </Text>

            <Text
              style={{
                color: '#6b6b6b',
                fontSize: 16,
                paddingTop: 5,
              }}>
              {this.props.id}
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 15,
              marginTop: 20,
              paddingBottom: 5,
            }}>
            <Text style={{fontSize: 24, color: 'black', fontWeight: 'bold'}}>
              {this.props.title}
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 15,
            }}>
            <Text style={{fontSize: 17, color: 'black'}}>
              {this.props.desc}
            </Text>
          </View>
        </ScrollView>

        {this.state.cart_button == false ? (
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
              onPress={() => this.add_cart()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48%',
                height: 50,
                borderRadius: 5,
                borderColor: 'dodgerblue',
                borderWidth: 1.5,
              }}>
              <Text
                style={{
                  color: 'dodgerblue',
                  fontSize: 18,
                  paddingLeft: 5,
                }}>
                Add To Cart
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48%',
                height: 50,
                borderRadius: 5,
                backgroundColor: 'dodgerblue',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  paddingLeft: 5,
                }}>
                Buy Now
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => Actions.cart()}
            style={{
              // flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              height: 50,
              borderRadius: 5,
              backgroundColor: 'dodgerblue',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                paddingLeft: 5,
              }}>
              View Cart
            </Text>
          </TouchableOpacity>
        )}

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

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add_cart: cart => {
      dispatch({type: 'add_cart', payload: cart});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(product_details);
