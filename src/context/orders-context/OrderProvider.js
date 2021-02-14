import React, { useReducer } from 'react'
import { OrderContext } from './order-context'
import axiosInstance from '../../axios';
import {
    ORDER_FETCH_FAILURE,
    ORDER_FETCH_SUCCESS
} from './order-action';
import { orderReducer } from './orders-reducer';

function OrderProvider(props) {

    const initialState = {
        orders: [],
    }
    const [state, dispatch] = useReducer(orderReducer, initialState);

    const fetchOrders = async () => {
        try {
            const axios = axiosInstance();
            const result = await axios.get('/orders');
            dispatch({ type: ORDER_FETCH_SUCCESS, payload: result.data.orders });
        } catch (err) {
            dispatch({ type: ORDER_FETCH_FAILURE })
        }
    }

    return (
        <OrderContext.Provider value={{ orderState: state, fetchOrders }}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderProvider
