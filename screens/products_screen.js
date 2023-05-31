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
import product_details from './product_details';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class products_screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data5: [],
      spinner: false,
    };
  }

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
    this.All_Products();
  };

  All_Products = () => {
    let api = Connection + 'restapi.php?action=All_Products';
    console.log('pass => ', api);
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
    })
      .then(response => response.json())
      .then(response => {
        let table = [];
        let record = response.response;
        let len = record.length;

        console.log('length',len)

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

  createtable2 = () => {
    let table = [];
    let record1 = this.state.data5;
    let len = record1.length;

    console.log('lengthhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',len);

    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let id = record1[i].id;

        let userid = record1[i].user_id;
        let location = record1[i].location;
        let category = record1[i].category;
        let title = record1[i].title;
        let price = record1[i].price;
        let desc = record1[i].desc;
        let name = record1[i].name;
        let phone = record1[i].phone;
        let profile1 = record1[i].photo;
        let profile = Connection + 'images/' + profile1;

        console.log('idididididididid', id);
        table.push(
          <View>
            {
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    Actions.product_details({
                      id:id,
                      userid:userid,
                      location:location,
                      category:category,
                      title:title,
                      name1: name,
                      price: price,
                      desc:desc,
                      phone:phone,
                      profile:profile,
                    })
                  }>
                  <View style={{backgroundColor: 'white'}}>
                    <View
                      style={{
                        width: width / 1.07,
                        alignSelf: 'center',
                        marginHorizontal: 10,
                        backgroundColor: 'white',
                        marginTop: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: 'lightgray',
                        marginBottom: 5,
                        paddingBottom: 10,
                      }}>
                      
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
                                name="picture-o"
                                type="FontAwesome"
                                style={{
                                  position: 'absolute',
                                  bottom: 5,
                                  left: 10,
                                  color: 'white',
                                  fontSize: 13,
                                }}
                              />
                              <Text
                                style={{
                                  position: 'absolute',
                                  bottom: 5,
                                  left: 30,
                                  color: 'white',
                                  fontSize: 15,
                                }}>
                                0
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: 'dodgerblue',
                                position: 'absolute',
                                top: 10,
                                borderTopEndRadius: 10,
                                borderBottomEndRadius: 10,
                              }}>
                              <Icon
                                name="shopping-cart"
                                type="Entypo"
                                style={{
                                  color: 'white',
                                  fontSize: 13,
                                  paddingHorizontal: 7,
                                  paddingVertical: 2,
                                }}
                              />
                            </View>
                          </View>

                          <View>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 15,
                                paddingLeft: 10,
                              }}>
                              {title}
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 17,
                                paddingLeft: 10,
                                paddingTop: 5,
                              }}>
                              PKR{' '}
                              <Text style={{fontWeight: 'bold'}}>{price}</Text>
                            </Text>

                            <View
                              style={{
                                flexDirection: 'row',
                                paddingBottom: 15,
                                height: 30,
                                marginTop: 10,
                              }}>
                              <View
                                style={{
                                  borderEndWidth: 1,
                                  borderEndColor: 'gray',
                                  paddingLeft: 10,
                                  paddingRight: 5,
                                }}>
                                <Text style={{color: 'gray'}}>{title}</Text>
                              </View>
                              <View
                                style={{
                                  paddingHorizontal: 5,
                                }}>
                                <Text style={{color: 'gray'}}>{category}</Text>
                              </View>
                            </View>
                          </View>

                          <Icon
                            name="heart"
                            type="AntDesign"
                            style={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              color: 'lightgray',
                              fontSize: 15,
                            }}
                          />
                        </View>
                      
                    </View>
                  </View>
                </TouchableOpacity>
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
        <View
          style={{
            backgroundColor: '#064189',
            paddingVertical: 10,
            //   paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: width / 1.2,
              // justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              flexDirection: 'row',
            }}>
            <Icon
            onPress={()=>Actions.pop()
            }
              name="left"
              type="AntDesign"
              style={{
                color: 'white',
                fontSize: 20,
                paddingLeft: 10,
              }}
            />

            <TextInput
              style={{
                width: '95%',
                height: 43,
                borderRadius: 5,
                paddingLeft: 30,
                color: 'darkgrey',
                backgroundColor: 'white',
                fontSize: 15,
                marginLeft: 5,
              }}
              placeholder="Search for auto parts"
              placeholderTextColor="darkgrey"
            />
            <Icon
              name="search"
              type="Ionicons"
              style={{
                color: 'gray',
                fontSize: 15,
                position: 'absolute',
                left: 40,
              }}
            />
            <Icon
              name="heart"
              type="AntDesign"
              style={{
                color: 'white',
                fontSize: 20,
                paddingLeft: 10,
              }}
            />
          </View>
        </View>

        <View>
          <ScrollView
            style={{
              flexDirection: 'row',
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 10,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={{
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginRight: 3,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 13,
                  paddingHorizontal: 15,
                }}>
                Category
              </Text>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginHorizontal: 3,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 13,
                  paddingHorizontal: 15,
                }}>
                Brand
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginHorizontal: 3,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 13,
                  paddingHorizontal: 15,
                }}>
                Price
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'lightgray',
                borderRadius: 20,
                marginHorizontal: 3,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 13,
                  paddingHorizontal: 15,
                }}>
                Sold By
              </Text>
            </View>
          </ScrollView>
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
          horizontal={false}
          showsHorizontalScrollIndicator={false}>
          {this.createtable2()}
        </ScrollView>
      </View>
    );
  }
}

export default products_screen;
