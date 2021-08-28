import React ,{useEffect}from 'react'
import { StyleSheet, View ,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Constants/Çolors';
import {useDispatch} from 'react-redux';
import * as authActions from '../Store/Actions/authActions';



const StartUpScreen = (props) => {

    const dispatch=useDispatch();



    useEffect(() => {
        const tryAutoLogin =  async () => {
            const userData= await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('auth');
                return;
            }
            
            const transormedData=JSON.parse(userData) ;
            
            const {token,userId,expirationDate} = transormedData;
            const newexpirationDate=new Date(expirationDate);
            if(newexpirationDate<=new Date()|| !token||!userId){
                props.navigation.navigate('auth');
                return;
            }

            const expirationTime=newexpirationDate.getTime()-new Date().getTime();

            props.navigation.navigate('shop');
            dispatch(authActions.authenticate(token,userId,expirationTime));

        }

        tryAutoLogin();
    },[dispatch])

    return (
        <View style={styles.screen}>
           <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    )
}

export default StartUpScreen;

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',

    },
})
