import PRODUCTS from '../../Data/DummyData';
import {DELETE_PRODUCT, CREATE_PRODUCT,UPDATE_PRODUCT,SET_PRODUCT} from '../Actions/productActions';
import Product from '../../Models/Product';
const initialState ={
    availableProducts:[],
    userProducts:[],
}

const productReducer=(state=initialState,action)=>{

switch(action.type){
    case CREATE_PRODUCT:
        const newProduct = new Product(
         action.productData.id,
          action.productData.ownerId,
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          action.productData.price
        );
        return {
          ...state,
          availableProducts: state.availableProducts.concat(newProduct),
          userProducts: state.userProducts.concat(newProduct)
        };
      case UPDATE_PRODUCT:
        const productIndex = state.userProducts.findIndex(
          prod => prod.id === action.pid
        );
        const updatedProduct = new Product(
          action.pid,
          state.userProducts[productIndex].ownerId,
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          state.userProducts[productIndex].price
        );
        const updatedUserProducts = [...state.userProducts];
        updatedUserProducts[productIndex] = updatedProduct;
        const availableProductIndex = state.availableProducts.findIndex(
          prod => prod.id === action.pid
        );
        const updatedAvailableProducts = [...state.availableProducts];
        updatedAvailableProducts[availableProductIndex] = updatedProduct;
        return {
          ...state,
          availableProducts: updatedAvailableProducts,
          userProducts: updatedUserProducts
        }

    case DELETE_PRODUCT:
        return {
            ...state,
            userProducts:state.userProducts.filter(prod=>prod.id!==action.productId),
            availableProducts:state.availableProducts.filter(prod=>prod.id!==action.productId)
        }
    case SET_PRODUCT:

      return {...state,
        availableProducts:action.products,
        userProducts:action.userProducts
      }

    default:
        return state;
}

}

export default productReducer;