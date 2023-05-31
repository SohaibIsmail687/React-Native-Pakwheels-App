import React from 'react';
import {Text} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Home from './screens/Home';
import wheeldetails from './screens/wheeldetails';
import pakwheelsbottomtab from './screens/pakwheelsbottomtab';
import pakwheelsads from './screens/pakwheelsads';
import ad_details from './screens/ad_details';
import sale_car from './screens/sale_car';
import signin from './screens/signin';
import signup from './screens/signup';
import Splash from './screens/Splash';
import Edit_My_Ads from './screens/Edit_My_Ads';
import sale_auto_parts from './screens/sale_auto_parts';
import profile from './screens/profile';
import products_screen from './screens/products_screen';
import product_details from './screens/product_details';
import cart from './screens/cart';
import update_profile from './screens/update_profile';
import orders from './screens/orders';

console.disableYellowBox = true;
export default function App() {
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="Splash"
          component={Splash}
          title="Splash"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="cart"
          component={cart}
          title="cart"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="signin"
          component={signin}
          title="signin"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="signup"
          component={signup}
          title="signup"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="profile"
          component={profile}
          title="profile"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="update_profile"
          component={update_profile}
          title="update_profile"
          hideNavBar={true}
          initial
        />
        <Scene
          key="Home"
          component={Home}
          title="Home"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="wheeldetails"
          component={wheeldetails}
          title="wheeldetails"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="pakwheelsads"
          component={pakwheelsads}
          title="pakwheelsads"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="pakwheelsbottomtab"
          component={pakwheelsbottomtab}
          title="pakwheelsbottomtab"
          hideNavBar={true}
          initial
        />
        <Scene
          key="ad_details"
          component={ad_details}
          title="ad_details"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="sale_car"
          component={sale_car}
          title="sale_car"
          hideNavBar={true}
          // initial
        />
        <Scene
          key="sale_auto_parts"
          component={sale_auto_parts}
          title="sale_auto_parts"
          hideNavBar={true}
          // initial
        />

        <Scene
          key="products_screen"
          component={products_screen}
          title="products_screen"
          hideNavBar={true}
          // initial
        />

        <Scene
          key="product_details"
          component={product_details}
          title="product_details"
          hideNavBar={true}
          // initial
        />

        <Scene
          key="Edit_My_Ads"
          component={Edit_My_Ads}
          title="Edit_My_Ads"
          hideNavBar={true}
          // initial
        />

        <Scene
          key="orders"
          component={orders}
          title="orders"
          hideNavBar={true}
          // initial
        />
      </Stack>
    </Router>
  );
}
