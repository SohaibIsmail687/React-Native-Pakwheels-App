import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Actions, Lightbox} from 'react-native-router-flux';
import {Icon} from 'native-base';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageLoad from 'react-native-image-placeholder';
import Connection from '../connection';
import pakwheelsbottomtab from './pakwheelsbottomtab';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      my_like: false,
      data5: [],
      cart_array: [],
      show: false,
      cart_button: false,
      total_quantity: 0,
      total_amount_with_shipping: '',
    };
  }

  componentDidMount = async () => {
    if (this.props.cart == '') {
      console.log('iffffffffffffffffffffffffffffffffffffff');
    } else {
      let record = this.props.cart;
      let len = this.props.cart.length;

      console.log('length of reduxxxxxxxxxxxxxxxxx', len);
      var sum = 0;
      for (let i = 0; i < len; i++) {
        let id = record[i].p_id;
        let p_price = record[i].p_price;
        sum += Number(p_price);
      }
      this.setState({
        total_sum: sum,
        total_quantity: len,
      });

      setTimeout(() => {
        let total_amount = this.state.total_sum + 199;
        this.setState({
          total_amount_with_shipping: total_amount,
        });
      }, 100);
    }
    let user = await AsyncStorage.getItem('user');
    let parsed = JSON.parse(user);
    // console.log('Local Storage Data', user);
    let id = parsed[0].id;
    this.setState({
      id: id,

      data5: this.props.cart,
    });
    // this.get_liked_ad();

    console.log('imaggggggggggggggggggggggggggeeeeeeeeeeeee', this.props.cart);
  };

  plus_product = val => {
    // let index1 = this.state.cart_arry.findIndex(x=>x.product_id==val);
    if (this.props.cart == '') {
      console.log('iffffffffffffffffffffffffffffffffffffff');
    } else {
      var record = this.state.data5;
      var len = record.length;

      console.log('length of reduxxxxxxxxxxxxxxxxx', len);

      for (let i = 0; i < len; i++) {
        let id = record[i].p_id;

        // console.log('Reduxxxxxxxxxxxxx Idddddddddddddd', id);

        if (id == val) {
          var p_quantity = record[i].p_quantity;
          var p_price = record[i].p_price;
          var fixed_price = record[i].fixed_price;

          let xx = val + ' ' + p_price;

          let index1 = this.state.data5.findIndex(x => x.p_id == val);

          let abs = Number(p_quantity) + Number(1);

          // objIndex = myArray.findIndex((obj => obj.id == 1));

          //Log object to Console.
          console.log('Before absabsabsabsabs: ', abs);
          console.log('Before p_pricep_pricep_price: ', fixed_price);

          //Update object's name property.
          this.state.data5[index1].p_quantity = Number(p_quantity) + Number(1);
          this.state.data5[index1].p_price = Number(abs) * Number(fixed_price);

          this.setState({
            data5: this.state.data5,
          });
        }
      }

      setTimeout(() => {
        this.props.add_cart(this.state.data5);
        console.log('TYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', this.props.cart);
        this.total_price_total_quantuity();
      }, 100);
    }
  };

  minus_product = val => {
    // let index1 = this.state.cart_arry.findIndex(x=>x.product_id==val);
    if (this.props.cart == '') {
      console.log('iffffffffffffffffffffffffffffffffffffff');
    } else {
      var record = this.state.data5;
      var len = record.length;

      console.log('length of reduxxxxxxxxxxxxxxxxx', len);

      for (let i = 0; i < len; i++) {
        let id = record[i].p_id;

        // console.log('Reduxxxxxxxxxxxxx Idddddddddddddd', id);

        if (id == val) {
          var p_quantity = record[i].p_quantity;

          if (p_quantity == 1) {
            console.log('Product Quantityyyyyyyyyyyyy', p_quantity);
          } else {
            var p_price = record[i].p_price;
            var fixed_price = record[i].fixed_price;

            let xx = val + ' ' + p_price;

            let index1 = this.state.data5.findIndex(x => x.p_id == val);

            let abs = Number(p_quantity) - Number(1);

            console.log('Before absabsabsabsabs: ', abs);
            console.log('Before p_pricep_pricep_price: ', fixed_price);

            //Update object's name property.
            this.state.data5[index1].p_quantity =
              Number(p_quantity) - Number(1);
            this.state.data5[index1].p_price =
              Number(abs) * Number(fixed_price);

            this.setState({
              data5: this.state.data5,
            });
          }
        }
      }

      setTimeout(() => {
        this.props.add_cart(this.state.data5);
        console.log('TYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', this.props.cart);
        this.total_price_total_quantuity();
      }, 100);
    }
  };

  total_price_total_quantuity = () => {
    if (this.props.cart == '') {
      console.log('iffffffffffffffffffffffffffffffffffffff');

      this.setState({
        total_quantity: 0,
      });
    } else {
      let record = this.props.cart;
      let len = this.props.cart.length;

      console.log('length of reduxxxxxxxxxxxxxxxxx', len);
      var sum = 0;
      for (let i = 0; i < len; i++) {
        let id = record[i].p_id;
        let p_price = record[i].p_price;
        sum += Number(p_price);

        // console.log('Reduxxxxxxxxxxxxx Idddddddddddddd', id);
      }
      this.setState({
        total_sum: sum,
        total_quantity: len,
      });

      setTimeout(() => {
        let total_amount = this.state.total_sum + 199;
        this.setState({
          total_amount_with_shipping: total_amount,
        });
      }, 100);
    }
  };

  array_index_for_delete = val => {
    console.log('CCCCCCCCCCCCCCCCCCC', val);

    let index1 = this.state.data5.indexOf(val);
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF', index1);

    this.state.data5.splice(index1, 1),
      console.log('SSSSSSSSSSSSSSSSSSSSSSSSS', this.state.id);

    this.total_price_total_quantuity();
    this.setState({
      // main_array:this.state.main_array.splice(index1,1),
    });
  };

  Checkout_Orders = () => {
    let uploaddata = new FormData();

    let user_id = this.state.id;
    let products = JSON.stringify(this.state.data5);
    let total_amount_with_shipping = this.state.total_amount_with_shipping;
    let total_quantity = this.state.total_quantity;


    // if (this.state.multi_image_check == "true") {
      // under develop multi images code
      let record1 = this.state.data5
      let len = record1.length

console.log('lenlenlenlenlen',len)

      for (let i = 0; i < len; i++) {
        let p_id = record1[i].p_id
        let p_name = record1[i].p_name
        let p_price = record1[i].p_price
        let p_quantity = record1[i].p_quantity



        let p_id_1 = p_id +i
console.log('p_idp_idp_idp_idp_idp_id',p_id)
        uploaddata.append('p_id', p_id_1);
        // uploaddata.append('p_name', p_name);
        // uploaddata.append('p_price', p_price);
        // uploaddata.append('p_quantity', p_quantity);



        // let newImage = {
        //   uri: path,
        //   name: "my_photo.jpg",
        //   type: "image/jpg",
        // };
        // let image = 'new_image' + i
        // uploaddata.append('multi_image_check', "true");
        // uploaddata.append(image, newImage);
      }
      /////////
      uploaddata.append('len', len);
    

    // else {
    //   uploaddata.append('multi_image_check', "false");

    // }



    console.log('user_iduser_iduser_iduser_id => ', user_id);
    console.log('Productssssssssssssssssssssssss => ', products);

    this.setState({spinner: true});

    uploaddata.append('user_id', user_id);
    // uploaddata.append('products', products);
    uploaddata.append('total_amount_with_shipping', total_amount_with_shipping);
    uploaddata.append('total_quantity', total_quantity);

    let api = Connection + 'restapi.php?action=Checkout_Orders';
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
        console.log('response', response.response);

        if (response.response == 'fail') {
          this.setState({
            spinner: false,
          });
          alert('respnose fail');
        } else {
          this.setState({
            spinner: false,
          });
          let a = [];
          this.props.add_cart(a);
          Toast.show('You successfully posted your Order.');
          Actions.pakwheelsbottomtab();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  createtable2 = () => {
    let table = [];
    let record1 = this.props.cart;
    let len = record1.length;

    console.log(len);

    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let id = record1[i].p_id;
        let p_name = record1[i].p_name;
        let p_profile = record1[i].p_profile;
        let p_price = record1[i].p_price;
        let p_quantity = record1[i].p_quantity;

        // console.log('stattttttttttttttttuuuuuuuuussssss', profile);
        table.push(
          <View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  width: width / 1.1,
                  paddingVertical: 10,
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  shadowOffset: 5,
                  shadowOpacity: 5,
                  shadowColor: 'gray',
                  elevation: 5,
                }}>
                <ImageLoad
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                    borderRadius: 3,
                  }}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: p_profile}}
                  placeholderStyle={{
                    width: 70,
                    height: 70,
                    resizeMode: 'stretch',
                    borderRadius: 3,
                  }}
                />

                {/* <Image
                 style={{
                   width: 70,
                   height: 70,
                   resizeMode: 'stretch',
                   borderRadius: 3,
                 }}
                 source={require('../assets/BBQ.jpg')}
               /> */}
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: 'black',
                        paddingLeft: 10,
                        fontWeight: 'bold',
                        width: '65%',
                      }}
                      numberOfLines={2}>
                      {p_name}
                    </Text>

                    <TouchableOpacity
                      onPress={() => this.array_index_for_delete()}>
                      <Text style={{color: 'red', paddingLeft: 5}}>Remove</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 3,
                      alignItems: 'center',
                    }}>
                    <View style={{width: '55%'}}>
                      <Text
                        style={{
                          color: 'dodgerblue',
                          paddingLeft: 10,
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        PKR {p_price}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity onPress={() => this.minus_product(id)}>
                        <Icon
                          name="minus"
                          type="Entypo"
                          style={{fontSize: 20}}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 17,
                          color: 'gray',
                          paddingHorizontal: 10,
                        }}>
                        {p_quantity}
                      </Text>

                      <TouchableOpacity onPress={() => this.plus_product(id)}>
                        <Icon
                          name="plus"
                          type="Entypo"
                          style={{fontSize: 20}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
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
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#064189',
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          <Icon
            onPress={() => Actions.pop()}
            name="left"
            type="AntDesign"
            style={{color: 'white', fontSize: 20, paddingLeft: 15}}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              paddingLeft: 10,
            }}>
            Cart ({this.state.total_quantity})
          </Text>
        </View>

        {this.state.data5 != '' ? (
          <View style={{flex: 1}}>
            {this.createtable2()}

            <View
              style={{
                marginTop: 20,
                width: width / 1.1,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'gray'}}>
                Subtotal ({this.state.total_quantity} items)
              </Text>
              <Text style={{color: 'gray'}}>PKR {this.state.total_sum}</Text>
            </View>

            <View
              style={{
                marginTop: 10,
                width: width / 1.1,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'gray'}}>Shipping Charges</Text>
              <Text style={{color: 'gray'}}>PKR 199</Text>
            </View>

            <View
              style={{
                marginTop: 10,
                width: width / 1.1,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 10,
              }}>
              <Text style={{color: 'gray', fontWeight: 'bold'}}>
                Total
                <Text style={{fontWeight: 'normal'}}> (incl. VAT):</Text>
                <Text style={{color: 'dodgerblue', fontSize: 16}}>
                  PKR {this.state.total_amount_with_shipping}{' '}
                </Text>
              </Text>
              <TouchableOpacity
                onPress={() => this.Checkout_Orders()}
                style={{
                  backgroundColor: 'dodgerblue',
                  paddingHorizontal: 25,
                  paddingVertical: 7,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white'}}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 20}}>
              No Items added in the cart.
            </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(cart);
// export default cart;
