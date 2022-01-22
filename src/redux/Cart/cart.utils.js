export const existingCartitem = ({
    prevCartItems,
    nextCartItem,
}) => {
    return prevCartItems.find(
        cartItem => cartItem.documentID === nextCartItem.documentID
    );
};

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem,
}) => {

    const quantityIncrement = 1
    const cartItemExists = existingCartitem({prevCartItems, nextCartItem})

    if(cartItemExists) {
        return  prevCartItems.map(cartItem => 
            cartItem.documentID == nextCartItem.documentID
            ? {
                 ...cartItem,
                 quantity: cartItem.quantity + quantityIncrement
            } : cartItem
        );
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement,
        }
    ];
};