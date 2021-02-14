import {
    PRODUCT_FETCH_FAILURE,
    PRODUCT_FETCH_SUCCESS,
    CATEGORIES_FETCH_SUCCESS,
    CATEGORIES_FETCH_FAILURE,
    FILTER_PRODUCTS,
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_SUCCESS,
    CART_DETAILS_FETCH_FAILURE,
    CART_DETAILS_FETCH_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILURE,
    CLEAR_CART,
    CART_DETAILS_UPDATE_SUCCESS
} from "./product-action";

const productReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                products: payload.products,
                filteredProducts: payload.products,
            }
        case PRODUCT_FETCH_FAILURE:
            return {
                ...state,
                products: [],
                filteredProducts: []
            }

        case CATEGORIES_FETCH_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        case CATEGORIES_FETCH_FAILURE:
            return {
                ...state,
                categories: []
            }

        case FILTER_PRODUCTS:
            return {
                ...state,
                filteredProducts: payload
            }

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cart: payload
            }

        case ADD_TO_CART_FAILURE:
            return {
                ...state,
            }
        case CART_DETAILS_FETCH_SUCCESS:
            return {
                ...state,
                cart: payload
            }
        case CART_DETAILS_FETCH_FAILURE:
            return {
                ...state,
                cart: {
                    cartProducts: []
                }
            }

        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                cart: payload
            }

        case REMOVE_FROM_CART_FAILURE:
            return {
                ...state
            }

        case CLEAR_CART:
            return {
                ...state,
                cart: {
                    cartProducts: []
                }
            }

        case CART_DETAILS_UPDATE_SUCCESS:
            return {
                ...state,
                cart: payload,
            }
        default:
            return state;
    }
}

export { productReducer };