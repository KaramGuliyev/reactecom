import ordersTypes from "./orders.types";

const INITAL_STATE = {
    orderHistory: [],
    orderDetails: {},
}

const ordersReducer = (state=INITAL_STATE, action) => {
    switch(action.type) {
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload,
            };
        case ordersTypes.SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload,
            };
        default: 
            return state;
    }
};

export default ordersReducer;