import {ADD_ORDER,SET_ORDER}from '../Actions/orderActions';
import Order from '../../Models/Order';

const initialState={
    orders:[]

}

const ordersReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_ORDER:

            const newOrder = new Order(
                action.id,
                action.items,
                action.amount,
                action.date,
              )
              return {
                ...state,
                orders:state.orders.concat(newOrder)
              };

        case SET_ORDER:
            return {
                orders:action.orders
            }
        
        default:
            return state;
    }
}

export default ordersReducer;