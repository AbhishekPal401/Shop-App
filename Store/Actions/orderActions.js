import Order from "../../Models/Order";

export const ADD_ORDER="ADD_ORDER"
export const SET_ORDER="SET_ORDER"

export const addOrder=(cartItems,totalAmount)=>{

    return async (dispatch,getState)=> {
        const date=new Date().toISOString();
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        const response= await fetch(`https://rn-shopapp-d3ea7-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date
      })
    });

    



    const resData= await response.json();
       
        dispatch(
            {
                type: ADD_ORDER,
                id:resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date,
            })

    }

    
}


export const fetchOrders=()=>{

    return async (dispatch,getState) => {
      const userId=getState().auth.userId;
        try {
          
          const response= await fetch(`https://rn-shopapp-d3ea7-default-rtdb.firebaseio.com/orders/${userId}.json`);
  
  
          if(!response.ok){
            throw new Error ('Something went Wrong !');
          }
  
      const resData= await response.json();      
  
      const loadedOrders=[];
      for(let key in resData) {
        loadedOrders.push( new Order(key,resData[key].cartItems,resData[key].totalAmount,new Date(resData[key].date) ));
      }
  
     
  
      dispatch({
          type: SET_ORDER,
          orders:loadedOrders
  
          })
  
        } catch (error) {
          throw error
        }
        
      
  
  
  
        }
      
    



      }
