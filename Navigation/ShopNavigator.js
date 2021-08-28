import React from 'react';
import {Platform,SafeAreaView,Button,View} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerNavigatorItems } from 'react-navigation-drawer';
import productsOverview from '../Screens/Shop/ProductsOverview';
import Colors from '../Constants/Çolors';
import ProductsDetails from '../Screens/Shop/ProductsDetails';
import Cart from '../Screens/Shop/Cart';
import Orders from '../Screens/Shop/Order';
import UserProduct from '../Screens/Users/UserProduct';
import EditProduct from '../Screens/Users/EditProduct';
import Auth from '../Screens/Users/Auth';
import {Ionicons} from '@expo/vector-icons';
import StartUpScreen from '../Screens/StartUpScreen';
import {useDispatch} from 'react-redux';
import * as authActions from '../Store/Actions/authActions';



const defaultNavigationOptionsConfig={
    headerStyle:{
        backgroundColor:Platform.OS==='android'?Colors.primary:'',
        
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold',
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans',
    },
    headerTintColor:Platform.OS==='android'?'white':Colors.primary,
    
}

const productnavigator=createStackNavigator({
productOverview:productsOverview,
productDetails:ProductsDetails,
cartDetails:Cart,

},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons name={Platform.OS==='android'?'md-cart':'ios-cart'} size={23}  color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions:defaultNavigationOptionsConfig
});


const ordersNavigator=createStackNavigator({
    orders:Orders
},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons name={Platform.OS==='android'?'md-list':'ios-list'} size={23}  color={drawerConfig.tintColor} />
    },
defaultNavigationOptions:defaultNavigationOptionsConfig
});

const AdminNavigator=createStackNavigator({
    user:UserProduct,
    edit:EditProduct
},{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons name={Platform.OS==='android'?'md-create':'ios-create'} size={23}  color={drawerConfig.tintColor} />
    },
defaultNavigationOptions:defaultNavigationOptionsConfig
});



const shopNavigator=createDrawerNavigator({
    products:productnavigator,
    orders:ordersNavigator,
    admin:AdminNavigator

},{
    contentOptions:{
        activeTintColor:Colors.primary
    },
    contentComponent:props=>{

        const dispatch=useDispatch();


        return(
            <View style={{flex:1,padding:15}}>
            <SafeAreaView  forceInset={{top:'always',horizontal:'never'}} >
                <DrawerNavigatorItems {...props}  />
                <Button title="Logout" onPress={()=>{ dispatch(authActions.logout()); 
                    // props.navigation.navigate('auth')
                     }} />
            </SafeAreaView>
            </View>
           
        )
    }
});

const authNavigator=createStackNavigator({
    auth:Auth
},{
    defaultNavigationOptions:defaultNavigationOptionsConfig
})


const MainNavigator=createSwitchNavigator({
    start:StartUpScreen,
    auth:authNavigator,
    shop:shopNavigator
})


export default createAppContainer(MainNavigator);