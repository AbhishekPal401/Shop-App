
import React ,{useState}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import {combineReducers,createStore ,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import productReducer from './Store/Reducers/productReducer';
import cartReducer from './Store/Reducers/cartReducer';
import ordersReducer  from './Store/Reducers/orderReducer';
import authReducer from './Store/Reducers/authReducer';
// import ShopNavigator from './Navigation/ShopNavigator';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { composeWithDevTools}from 'redux-devtools-extension';
import NavigationContainer from './Navigation/NaviagtionContainer';



const rootReducer=combineReducers({
product:productReducer,
cart:cartReducer,
orders:ordersReducer,
auth:authReducer,
})


const store=createStore(rootReducer,applyMiddleware(ReduxThunk),composeWithDevTools()); 

export default function App() {

  const [isLoaded]=useFonts({
    'open-sans':require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/Fonts/OpenSans-Bold.ttf')
  })

  

  if(!isLoaded){
    return<AppLoading/>
  }

  return (
    <Provider store={store}>
    <NavigationContainer/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
