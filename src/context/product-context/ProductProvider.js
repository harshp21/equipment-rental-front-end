import React, { useReducer } from 'react'
import axiosInstance from '../../axios';
import { productReducer } from './product-reducer';
import { ProductContext } from './product-context';
import {
    PRODUCT_FETCH_FAILURE,
    PRODUCT_FETCH_SUCCESS,
    CATEGORIES_FETCH_SUCCESS,
    CATEGORIES_FETCH_FAILURE,
    FILTER_PRODUCTS,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    CART_DETAILS_FETCH_SUCCESS,
    CART_DETAILS_FETCH_FAILURE,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    CLEAR_CART,
    CART_DETAILS_UPDATE_SUCCESS,
    CART_DETAILS_UPDATE_FAILURE
} from './product-action';
import { toast } from 'react-toastify';

function ProductProvider(props) {

    const initialState = {
        products: [],
        selectedProducts: [],
        cart: {
            cartProducts: []
        },
        categories: [],
        filteredProducts: [],
    }
    const [state, dispatch] = useReducer(productReducer, initialState);

    const fetchProducts = async () => {
        try {
            const axios = axiosInstance();
            const result = await axios.get('/products');
            dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: result.data });
        } catch (err) {
            toast.error(err.response.data.message);
            dispatch({ type: PRODUCT_FETCH_FAILURE });
        }
    }

    const fetchCategories = async () => {
        try {
            const axios = axiosInstance();
            const result = await axios.get('/categories');
            dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: result.data });
        } catch (err) {
            dispatch({ type: CATEGORIES_FETCH_FAILURE });
        }
    }

    const filterProducts = (categoryIds) => {

        if (categoryIds.length !== 0) {
            const filteredProducts = state.products.filter((product) => {
                return product.productCategory.some((category) => categoryIds.includes(category.categoryId));
            })
            dispatch({ type: FILTER_PRODUCTS, payload: filteredProducts });
        } else {
            dispatch({ type: FILTER_PRODUCTS, payload: state.products });
        }
    }

    const addToCart = async (product) => {
        try {
            const axios = axiosInstance();
            const result = await axios.post('/cart/add', {
                product
            });
            toast.success(result.data.message);
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: result.data.cartDetails })
        } catch (err) {
            dispatch({ type: ADD_TO_CART_FAILURE })
            toast.error(err.response.data.message);
        }
    }

    const removeFromCart = async (product) => {
        try {
            const axios = axiosInstance();
            const result = await axios.post('/cart/remove', {
                product
            });
            toast.success(result.data.message);
            dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: result.data.cartDetails })
        } catch (err) {
            dispatch({ type: REMOVE_FROM_CART_FAILURE })
            toast.error(err.response.data.message);
        }
    }

    const fetchCartProducts = async () => {
        try {
            const axios = axiosInstance();
            const result = await axios.get('/cart');
            dispatch({ type: CART_DETAILS_FETCH_SUCCESS, payload: result.data.cart })
        } catch (err) {
            dispatch({ type: CART_DETAILS_FETCH_FAILURE })
        }
    }

    const clearCart = () => {
        dispatch({ type: CLEAR_CART })
    }

    const updateCart = async (product, quantity, dateRange) => {
        try {
            const axios = axiosInstance();
            const result = await axios.put('/cart/update', { product, quantity, dateRange });
            dispatch({ type: CART_DETAILS_UPDATE_SUCCESS, payload: result.data.updatedCart });
        } catch (err) {
            dispatch({ type: CART_DETAILS_UPDATE_FAILURE });
        }
    }

    return (
        <ProductContext.Provider value={{ productState: state, fetchProducts, fetchCategories, filterProducts, addToCart, fetchCartProducts, removeFromCart, clearCart, updateCart }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductProvider
