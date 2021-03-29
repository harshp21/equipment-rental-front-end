import {
    ORDER_FETCH_SUCCESS,
    ORDER_FETCH_FAILURE
} from "./order-action";

const orderReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ORDER_FETCH_SUCCESS:
            return {
                ...state,
                orders: payload
            }
        case ORDER_FETCH_FAILURE:
            return {
                ...state,
                orders: []
            }
        default:
            return state;
    }

}

export { orderReducer };