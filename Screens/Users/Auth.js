import React ,{useState,useReducer,useCallback,useEffect}from 'react'
import { StyleSheet, Text, View,ScrollView,KeyboardAvoidingView,Button,Dimensions,Platform,ActivityIndicator ,Alert} from 'react-native';
import Colors from '../../Constants/Çolors';
import { LinearGradient} from 'expo-linear-gradient';
import {useDispatch,useSelector} from 'react-redux';
import * as authActions from '../../Store/Actions/authActions';
import Input from '../../Components/UI/Input';

const {width,height}=Dimensions.get('window');

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };

  //////////////////////////////////////////////

    const Auth = (props) => {

    const [isSignUp,setIsSignUp]=useState(false);
    const [isloading,setIsLoading] =useState(false);
    const [error,setError]=useState();

    const dispatch=useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
         username:'',
         password:'',
        },
        inputValidities: {
         username:false,
         password:false,
        },
        formIsValid:  false
      });

    const authHandler= async ()=>{

        let action;

        if(isSignUp){
        action=authActions.signup(formState.inputValues.username, formState.inputValues.password);
        }
        else{
        action=authActions.login(formState.inputValues.username,formState.inputValues.password);
        }

      
      setError(null)
      try{
        setIsLoading(true);
        await dispatch(action);
        props.navigation.navigate('shop')
      }
      catch(error){
        
        setError(error.message);
        setIsLoading(false);
      }
      
      

      

        
    }


    useEffect(() => {
      if(error){
        Alert.alert('An Error Ocurred!',error,[{text: 'Okay',style:'destructive'}])
      }
    },[error])

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}  >
            <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
        <View 
         style={styles.container}
         
         >
            <ScrollView style={styles.inputForm}>
            <Input id="username" label="Username" keyboardType="email-address" 
            require email autoCapitalize="none" errorText="Please enter valid email address"
            onInputChange={inputChangeHandler} initialValue="" 
            />
            <Input id="password" label="Password" keyboardType="default" 
            require secureTextEntry minLength={6} autoCapitalize="none" errorText="Please enter valid password"
            onInputChange={inputChangeHandler} initialValue="" 
            />
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                {isloading? <ActivityIndicator size='small' color={Colors.primary} />:<Button title= {isSignUp?'Sign Up':"Login"}  color={Colors.primary} onPress={authHandler}/>} 
                </View>
                <View style={styles.button}>
                <Button title={` Switch to ${isSignUp?`Login`:`Sign Up`}`} color={Colors.accent} onPress={()=>{
                    setIsSignUp(prevState=>!prevState);
                }}/>
                </View>

            </View>
            
            

            </ScrollView>
           
        </View>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}


Auth.navigationOptions=(navData)=>{
return {
    headerTitle:'Authenticate'
}
}

export default Auth;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        
    },
    container: {
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.5,
        shadowRadius:10,
        elevation:20,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20,
        overflow: 'hidden',
        width:'85%',
        maxWidth:400,
        
    },
    buttonContainer:{
        flex:1,
        marginVertical: 25

    },
    button: {
       marginBottom:10,

    },
    inputForm:{
        paddingHorizontal:20
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    
})
