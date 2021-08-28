import React ,{useState}from 'react'
import { StyleSheet, Text, View ,Platform,FlatList,Button,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import Colors from '../../Constants/Çolors';
import CartItem from '../../Components/Shop/CartItem';
import * as cartActions from '../../Store/Actions/cartActions';
import * as orderActions from '../../Store/Actions/orderActions';
const Cart = (props) => {

    const [isLoading,setIsLoading]=useState(false);

    const totalAmount=useSelector(state=>state.cart.totalAmount);
    const dispatch=useDispatch();
    

    const cartItems=useSelector(state=>{
        const transformCartItems=[];
        for(const key in state.cart.items){
            transformCartItems.push({
                productId: key,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformCartItems;
    });


    

    

    

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total:<Text style={styles.amount}>${ Math.round( totalAmount.toFixed(2) ) * 100/100 }</Text></Text>
                {isLoading&& <ActivityIndicator  size='large' color={Colors.primary}  />}
                <Button title="ORDER NOW" color={Colors.accent} disabled={cartItems.length===0} onPress={ async ()=>{

                    setIsLoading(true);
                  await  dispatch(orderActions.addOrder(cartItems,totalAmount));
                    setIsLoading(false);

                    }} />
            </View>
            <View style={styles.Details}>
                <FlatList data={cartItems} keyExtractor={item=>item.productId} renderItem={itemData=><CartItem 
                deletable={true}
                 quantity={itemData.item.quantity} 
                 title={itemData.item.productTitle} 
                 amount={itemData.item.sum}
                 onRemove={  ()=>{
                      
                      dispatch(cartActions.remove_from_card(itemData.item.productId))

                    }}
                 />}  />
            </View>
        </View>
    )
}

Cart.navigationOptions=(navData)=>{

    return{
        headerTitle:'Your Cart'
    }

}

export default Cart;

const styles = StyleSheet.create({
    screen:{
        margin: 20,

    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 20,
        padding:10,
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

    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    amount:{
        color:Colors.primary
    },
})
