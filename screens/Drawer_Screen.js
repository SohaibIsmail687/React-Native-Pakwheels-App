import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  BackHandler,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground,
  AsyncStorage,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
// import styles from './styles';
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Form,
  Container,
  Header,
} from 'native-base';

import RBSheet from 'react-native-raw-bottom-sheet';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Drawer_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedbtn: '1',
      name: '',
      id: '',
      check_login: false,
      aus: false,
      modalVisible: false,
      visible: false,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };
  handleBackButtonClick() {
    Actions.pop();

    return true;
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={require("../assets/Sonam.jpg")}
            style={{ width: 220, height: 40, alignSelf: "center", }}
            resizeMode="contain"
          />
        </View>
        <View style={{marginTop: 10}}>
          <TouchableOpacity onPress={() => Actions.login()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="home"
                type="Ionicons"
                style={{color: 'gray', fontSize: 24}}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Actions.All_Categories();
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="category"
                type="MaterialIcons"
                style={{color: 'gray', fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                All Specialties
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Actions.Search_Doctor();
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="search1"
                type="AntDesign"
                style={{color: 'gray', fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Find a Provider
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Actions.Expired_Appointments();
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="speaker-notes-off"
                type="MaterialIcons"
                style={{color: 'gray', fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Expired Appointments
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Actions.all_refunds();
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="cash-refund"
                type="MaterialCommunityIcons"
                style={{color: 'gray', fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Refunds
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <TouchableOpacity
            onPress={() => {
              Actions.About_Us();
            }}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="setting"
                type="AntDesign"
                style={{color: 'gray', fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                About Us
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <TouchableOpacity
            onPress={() => {
              Actions.Terms_Conditions();
            }}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="infocirlceo"
                type="AntDesign"
                style={{color: 'gray', fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.open();
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="logout"
                type="SimpleLineIcons"
                style={{color: 'gray', fontSize: 20}}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: width / 1.5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              marginVertical: 10,
            }}></View>

          <Dialog
            //  containerStyle={{ position: 'absolute', bottom: 0 }}
            style={{backgroundColor: 'black', padding: 0}}
            width={'90%'}
            visible={this.state.visible}
            dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
            <DialogContent
              style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 10}}>
              {/* <Image source={require("../assets/678_HelloProvider_Logo_DM-02-removebg-preview.png")} resizeMode="contain" style={{ width:150,  height: 80, alignSelf: 'center', marginTop: 20, }} /> */}
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'red',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Logout!
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Are you sure you want to logout
              </Text>
              {/* <Text allowFontScaling={false} style={{ fontSize: 13, textAlign: 'center', color: 'gray', fontWeight: 'bold', marginTop: 3 }}>Now you can consult with your patients.</Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 25,
                  marginBottom: 10,
                  paddingHorizontal: 17,
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => this.close()}
                  activeOpacity={0.8}
                  style={{
                    width: '45%',
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#eef3ff',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{color: '#09448D', fontWeight: 'bold'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  onPress={() => this.logout()}
                  activeOpacity={0.5}
                  style={{
                    width: '45%',
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#09448D',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{color: 'white', fontWeight: 'bold'}}>
                    Yes Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>

          <RBSheet
            ref={ref => {
              this.RBSheet2 = ref;
            }}
            height={220}
            closeOnDragDown={true}
            openDuration={220}
            customStyles={{
              container: {
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
              },
              draggableIcon: {
                backgroundColor: 'lightgray',
              },
            }}>
            <View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 18,
                  color: 'red',
                  marginTop: 5,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Logout
              </Text>
              <View
                style={{
                  width: width / 1 - 50,
                  borderBottomWidth: 1,
                  borderColor: '#d2d5da',
                  marginVertical: 20,
                  alignSelf: 'center',
                }}></View>

              <Text
                allowFontScaling={false}
                style={{color: 'black', fontSize: 15, alignSelf: 'center'}}>
                Are you sure you want to logout?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 25,
                  marginBottom: 10,
                  paddingHorizontal: 17,
                }}>
                <TouchableOpacity
                  onPress={() => this.RBSheet2.close()}
                  activeOpacity={0.8}
                  style={{
                    width: width / 2.3,
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#eef3ff',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{color: '#09448D', fontWeight: 'bold'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                  onPress={() => this.logout()}
                  activeOpacity={0.5}
                  style={{
                    width: width / 2.3,
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#09448D',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{color: 'white', fontWeight: 'bold'}}>
                    Yes Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </RBSheet>
        </View>
      </View>
    );
  }
}
