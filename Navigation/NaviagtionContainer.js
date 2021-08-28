import React,{useEffect,useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ShopNavigator from './ShopNavigator';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

const NaviagtionContainer = (props) => {

    const navRef=useRef();
    const isAuth=useSelector(state=>!!state.auth.token);


    useEffect(()=>{
        if(!isAuth){
            navRef.current.dispatch(NavigationActions.navigate({ routeName:'auth'}))
        }

    },[isAuth])

    return <ShopNavigator ref={navRef}/>
}

export default NaviagtionContainer;

const styles = StyleSheet.create({})
