import React from 'react'
import { StyleSheet, Text, View ,Image,Button,TouchableOpacity,TouchableNativeFeedback,Platform,Dimensions} from 'react-native';
import Colors from '../../Constants/Çolors';

const ProductItem = (props) => {

    let TouchableCmp=TouchableOpacity;

    if(Platform.OS==='android' && Platform.Version>=21){
        TouchableCmp=TouchableNativeFeedback; 
    }

    return (
        <View style={styles.product}>
            <TouchableCmp onPress={props.onViewDetails} useForeground>
            <View>
            <Image style={styles.image} source={{uri: props.imageUrl}}  resizeMode="cover" />
            <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>

            </View>
            </View>
            </TouchableCmp>
           
            <View style={styles.buttonContainer}>
               {props.children}
                 
                
            </View>
        </View>
    )
}

export default ProductItem;

const styles = StyleSheet.create({
    product:{
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
        overflow: 'hidden'
    },
    image:{
        width:'100%',
        height:'60%',

    },
    details: {
        alignItems:'center',
        height:'15%',
        padding:10
    },
    title:{
        fontSize:18,
        marginVertical:4,
        fontFamily:'open-sans-bold',
    },
    price:{
        fontSize:14,
        color:'#888',
        fontFamily:'open-sans',
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'25%',
        paddingHorizontal:20
    },
    button: {
        width:Dimensions.get('window').width/3.5
    },

})
