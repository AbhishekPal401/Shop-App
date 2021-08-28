import React from 'react'
import { StyleSheet, Text, View ,Image,Button,ScrollView,Dimensions } from 'react-native';
import {useSelector,useDispatch}  from 'react-redux';
import Colors from '../../Constants/Çolors';
import * as cartActions from '../../Store/Actions/cartActions';
const ProductsDetails = (props) => {

    const dispatch =useDispatch();

    const productId=props.navigation.getParam('productId');

    const product =useSelector(state=>state.product.availableProducts.find(x => x.id === productId));

    return (
        <ScrollView style={styles.details}>
            <Image style={styles.image} source={{ uri:product.imageUrl }}/>
            <View style={styles.button}>
            <Button color={Colors.primary} title="To Cart" onPress={()=>{ dispatch(cartActions.add_to_card(product)) }} />

            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    )
}

ProductsDetails.navigationOptions=(navData)=>{

    

    return{
        headerTitle:navData.navigation.getParam('productTitle')
    }
}

export default ProductsDetails

const styles = StyleSheet.create({
    details:{
        marginVertical:10
    },
    image:{
        width:'100%',
        height:300,
    },
    price:{
        color:'#888',
        fontSize:20,
        textAlign:'center',
        marginVertical:10,
        fontFamily:'open-sans',
    },
    description:{
        fontSize:16,
        marginHorizontal:20,
        textAlign:'center',
        fontFamily:'open-sans',
    },
    button:{
        alignItems:'center',
        marginVertical:10

    }
})
