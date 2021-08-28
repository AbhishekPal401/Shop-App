import React ,{useEffect,useState}from 'react'
import { StyleSheet, Text, View ,FlatList,Platform,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import { HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';
import OrderItem from '../../Components/Shop/OrderItem';
import * as orderActions from '../../Store/Actions/orderActions';
import Colors from '../../Constants/Çolors'

const Order = (props) => {

    const [isLoading,setIsLoading]=useState(false);
    const orders=useSelector(state=>state.orders.orders);
    const dispatch=useDispatch();

    useEffect(()=>{
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(()=>{
            setIsLoading(false);
        })
    },[dispatch])

    

    

    if(isLoading){
        return(
         <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
         <ActivityIndicator  size='large' color={Colors.primary}  />
    </View>
        )  
    }

    if(orders.length===0){
        return(
            <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
                <Text style={styles.text}>There is currently no orders</Text>
            </View>
        )
    }
   

    return (
        <FlatList data={orders} keyExtractor={item=>item.id} renderItem={itemData=><OrderItem  items={itemData.item.items} amount={itemData.item.totalAmount} date={itemData.item.readableDate} />}/>
    )
}

Order.navigationOptions=(navData)=>{
    return{
        headerTitle:'Your Orders',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Home' iconName={Platform.OS==='android' ?'md-menu':'ios-menu'} onPress={()=>{ navData.navigation.toggleDrawer() }} />
    </HeaderButtons>,
    }
}

export default Order;

const styles = StyleSheet.create({})
