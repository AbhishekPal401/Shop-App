import React,{useState} from 'react'
import { StyleSheet, Text, View ,Button} from 'react-native';
import CartItem from '../Shop/CartItem';
import Colors from '../../Constants/Çolors';
import Cart from '../../Screens/Shop/Cart';

const OrderItem = (props) => {

    const [showDetails,setShowDetails]=useState(false);



    return (
        <View style={styles.orderItemStyle}>

            <View style={styles.summary}> 
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
               
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}><Button title={ showDetails?"Hide Details":'Show Details'} onPress={()=>{ setShowDetails(prevState=>!prevState)}} color={Colors.primary} /></View>
            </View>
            {showDetails && <View> 
                    {props.items.map((item, index)=>{
                      return(
                        <CartItem quantity={item.quantity} amount={item.sum}title={item.productTitle} deletable={false} key={index} ></CartItem>
                      )  
                    })}

             </View>}
            
            
        </View>
    )
}

export default OrderItem;

const styles = StyleSheet.create({
    orderItemStyle:{
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
        margin:20,
        padding:20,
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:15
    },
    amount:{
        fontFamily:'open-sans-bold',
        fontSize:16,

    },
    date:{
        fontFamily:'open-sans',
        fontSize:16,
        color:'#888',
        
    },
    buttonContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },
    button:{
    }
})
