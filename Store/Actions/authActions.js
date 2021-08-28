import AsyncStorage from '@react-native-async-storage/async-storage';
// export const SIGN_UP='SIGN_UP';
// export const LOGIN='LOGIN';
export const AUTHENTICATE='AUTHENTICATE';
export const LOGOUT='LOGOUT';

let timer;


export const signup=(username,password) => {
    return async dispatch => {

       
        

        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCaDpbK9y8im7HUOxTc_gebu5Bl0cuvQAo',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:username,
                password:password,
                returnSecureToken:true
            }) 
        });

        if(!response.ok){
            const errorData= await response.json();
          
            const errorId=errorData.error.message;
            let  errorMsg="Something went wrong!";

            if(errorId=='EMAIL_EXISTS'){
            errorMsg='This email already exists';    
            }
            else if(errorId=='OPERATION_NOT_ALLOWED'){
                errorMsg='Password sign-in is disabled'; 
            }
            else if(errorId=='TOO_MANY_ATTEMPTS_TRY_LATER'){
                errorMsg='blocked all requests from this device due to unusual activity';
            }
            throw new Error(errorMsg);
        }

        const resData= await response.json();

       

        dispatch(authenticate(resData.idToken,resData.localId , parseInt(resData.expiresIn) *1000 ));
        const expirationDate= new Date(new Date().getTime()+ (parseInt(resData.expiresIn) *1000 ));
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    }
}

export const login=(username,password) => {
    return async dispatch => {

        
        

        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCaDpbK9y8im7HUOxTc_gebu5Bl0cuvQAo',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:username,
                password:password,
                returnSecureToken:true
            }) 
        });

        if(!response.ok){
            const errorData= await response.json();
           
            const errorId=errorData.error.message;
            let  errorMsg="Something went wrong!";

            if(errorId=='EMAIL_NOT_FOUND'){
            errorMsg='This email could not be found';    
            }
            else if(errorId=='INVALID_PASSWORD'){
                errorMsg='Incorrect password'; 
            }
            else if(errorId=='USER_DISABLED'){
                errorMsg='User account is banned or deleted';
            }
            throw new Error(errorMsg);
        }

        const resData= await response.json();

      

        dispatch(authenticate(resData.idToken,resData.localId, parseInt(resData.expiresIn) *1000));
        const expirationDate= new Date(new Date().getTime()+ (parseInt(resData.expiresIn) *1000 ));
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
        
    }
}


const saveDataToStorage=(token,userId,expirationDate) => {
AsyncStorage.setItem('userData',JSON.stringify({
    token: token,
    userId:userId,
    expirationDate:expirationDate.toISOString()
}))
}


export const authenticate=(token,userId,expiryTime) => {

    return dispatch=>{


        dispatch(setLogoutTimer(expiryTime))

        dispatch({
            type: AUTHENTICATE,
            token: token,
            userId:userId,
        })
    }

    
}


export const logout=()=>{

   
        clearLogoutTimer();
    AsyncStorage.removeItem('userData');
  return {type: LOGOUT}
    }
    



const clearLogoutTimer=()=>{
    if(timer){
        clearTimeout(timer)
    }
    
}


const setLogoutTimer=(expirationTime)=>{

    return dispatch=>{
   timer= setTimeout(()=>{
            dispatch(logout())
        },expirationTime)
    }
    
}