import {ADD_TO_CARD,REMOVE_FROM_CART} from '../Actions/cartActions';
import {ADD_ORDER}from '../Actions/orderActions';
import {DELETE_PRODUCT} from '../Actions/productActions';
import CartItem from '../../Models/Cart-Item';

const initialState ={
   items:{},
   totalAmount:0
}

const cartReducer=(state=initialState,action)=>{

switch(action.type){
    case ADD_TO_CARD:
        const addedProduct =action.product;
        const prodPrice=addedProduct.price;
        const prodTitle=addedProduct.title;

        let updateOrAddToCart;

        if(state.items[addedProduct.id]){
           updateOrAddToCart=new CartItem  (state.items[addedProduct.id].quantity+1,prodPrice,prodTitle,state.items[addedProduct.id].sum+prodPrice);
          
          
          
        }
        else{
             updateOrAddToCart=new CartItem(1,prodPrice,prodTitle,prodPrice);
            
        }
        return {
            ...state,
            items:{...state.items,[addedProduct.id]:updateOrAddToCart},
            totalAmount:state.totalAmount+prodPrice

        }
    case REMOVE_FROM_CART:
    const selectedCartItem=state.items[action.productId];
    const currentQuantity = selectedCartItem.quantity;
    let updatedItems;
    if(currentQuantity>1){
        const updatedSingleItem=new CartItem(selectedCartItem.quantity-1,selectedCartItem.productPrice,selectedCartItem.productTitle,selectedCartItem.sum-selectedCartItem.productPrice);
        updatedItems={... state.items,[action.productId]:updatedSingleItem}

    }
    else{

        updatedItems={...state.items};

        delete updatedItems[action.productId];

    }

        return {
            ...state,
            items: updatedItems,
            totalAmount:state.totalAmount-selectedCartItem.productPrice
        }
    case ADD_ORDER:
        return initialState

    case DELETE_PRODUCT:
        if(!state.items[action.productId]){
            return state;
        }
    const updatedItem={...state.items};
    delete updatedItem[action.productId];
    const itemTotal=state.items[action.productId].sum;

        return{
            ...state,
            items:updatedItem,
            totalAmount:state.totalAmount-itemTotal

        }

        
    default:
        return state;
}

}

export default cartReducer;