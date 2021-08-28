export const ADD_TO_CARD="ADD_TO_CARD"
export const REMOVE_FROM_CART="REMOVE_FROM_CART"


export const add_to_card=(product)=>{
    return{
        type: ADD_TO_CARD,
        product: product

    }
}

export const remove_from_card=(productId)=>{
    return{
        type: REMOVE_FROM_CART,
        productId: productId

    }
}