import React,{useEffect,useState,useCallback} from 'react'
import { StyleSheet,FlatList,Platform,View,Button,Dimensions,ActivityIndicator,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../Components/Shop/ProductItem';
import * as cartActions from '../../Store/Actions/cartActions';
import { HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../Components/UI/HeaderButton';
import Colors from '../../Constants/Çolors'
import * as productActions from '../../Store/Actions/productActions';

const ProductsOverview = (props) => {

    const [isloading,setIsLoading] =useState(false);
    const [isRefreshing,setISRefreshing] =useState(false);
    const [error,setError]=useState();
    const products=useSelector(state=>state.product.availableProducts);
    const dispatch=useDispatch();


    const loadProducts=useCallback(async ()=>{
        setISRefreshing(true);
        setError(null);

        try {

            await  dispatch(productActions.fetchProduct());
        } catch (error) {
            setError(error.message);
        }
        setISRefreshing(false)

    },[dispatch,setError,setIsLoading]) ;


    useEffect(() => {
    const willFocusSub=props.navigation.addListener('willFocus',loadProducts)

    return ()=>{
        willFocusSub.remove();
    }

    },[loadProducts])

   
    useEffect(()=>{
        setIsLoading(true);
        loadProducts().then(()=>{
            setIsLoading(false);
        });

        
    },[dispatch,loadProducts]);


    const productItems=(itemData)=>{

            return(
            <ProductItem imageUrl={itemData.item.imageUrl} 
            
            title={itemData.item.title}
            price={itemData.item.price} onViewDetails={()=>{
                props.navigation.navigate("productDetails" ,{productId:itemData.item.id,productTitle:itemData.item.title });

                 }} >
                
              <View style={styles.button}>
               <Button color={Colors.primary} title="Details" onPress={()=>{props.navigation.navigate("productDetails" ,{productId:itemData.item.id,productTitle:itemData.item.title }) }} />
                </View>
                <View  style={styles.button}>
                <Button color={Colors.primary} title="To Cart" onPress={()=>{
                dispatch(cartActions.add_to_card(itemData.item))
            }} />
                </View>  

            </ProductItem>
        ) 
    }

    if(error){
        return(
            <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
            <Text style={styles.text}>An Error has ocurred</Text>
            <Button title="Try Again" onPress={loadProducts} />
       </View>
           )
    }

    if(isloading){
       return(
        <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
        <ActivityIndicator  size='large' color={Colors.primary}  />
   </View>
       )  
       
    }

    if(!isloading && products.length==0){
        return(
            <View style={{ flex:1,justifyContent:'center' ,alignItems:'center'}}>
            <Text style={styles.text}>No products found maybe add some!</Text>
       </View>
           )
    }

    return (
        <FlatList onRefresh={loadProducts} refreshing={isRefreshing} data={products} keyExtractor={item=>item.id} renderItem={productItems} />
    )
}

ProductsOverview.navigationOptions=(navData)=>{

    return{
        headerTitle:'Product Overview',
        headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Home' iconName={Platform.OS==='android' ?'md-menu':'ios-menu'} onPress={()=>{ navData.navigation.toggleDrawer() }} />
    </HeaderButtons>,
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart' iconName={Platform.OS==='android' ?'cart-outline':'ios-cart'} onPress={()=>{ navData.navigation.navigate('cartDetails') }} />
        </HeaderButtons>
    }
    
}

export default ProductsOverview;

const styles = StyleSheet.create({
    button: {
        width:Dimensions.get('window').width/3.5
    },
    text:{
        fontSize:16,
        fontFamily:'open-sans',
        fontWeight:'600',

    },
})
