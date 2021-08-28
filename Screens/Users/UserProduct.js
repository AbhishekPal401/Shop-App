import React from 'react'
import { StyleSheet, Text, View,FlatList,Platform ,Button,Dimensions,Alert} from 'react-native';
import ProductItem from '../../Components/Shop/ProductItem';
import {useSelector,useDispatch} from 'react-redux';
import { HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';
import Colors from '../../Constants/Çolors';
import * as productActions from '../../Store/Actions/productActions';

const UserProduct = (props) => {

    const userProduct=useSelector(state=>state.product.userProducts);
    const dispatch=useDispatch();

    const deleteHandler=(id)=>{
        Alert.alert("Are you sure?","Do you really want to delete this item?",[{
            text:'No',
            style:'default'
        },{
            text:'Yes',
            style:'destructive',
            onPress:()=>{dispatch(productActions.deleteProduct(id))}
        }])
    }

    if(userProduct.length===0){
        return(
            <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
                <Text style={styles.text}>There is no products please add some</Text>
            </View>
        )
    }


    return (
        <FlatList  data={userProduct} keyExtractor={item=>item.id}  renderItem={itemData=>
        <ProductItem imageUrl={itemData.item.imageUrl} 
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetails={()=>{props.navigation.navigate('edit',{productId:itemData.item.id})}}>

            <View style={styles.button}>
               <Button color={Colors.primary} title="Edit" onPress={()=>{props.navigation.navigate('edit',{productId:itemData.item.id})}} />
            </View>
            <View  style={styles.button}>
                <Button color={Colors.primary} title="Delete" onPress={()=>{deleteHandler(itemData.item.id)}} />
            </View>
                
        </ProductItem> } />
    )
}


UserProduct.navigationOptions=(navData)=>{
    return {
        headerTitle:'Your Products',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Home' iconName={Platform.OS==='android' ?'md-menu':'ios-menu'} onPress={()=>{ navData.navigation.toggleDrawer() }} />
    </HeaderButtons>,
    headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='Home' iconName={Platform.OS==='android' ?'md-create':'ios-create'} onPress={()=>{ navData.navigation.navigate('edit') }} />
    </HeaderButtons>
       
    }
}

export default UserProduct;

const styles = StyleSheet.create({
    button: {
        width:Dimensions.get('window').width/3.5
    },
    text:{
        fontSize:16,
        fontWeight:'400'
    }
})
