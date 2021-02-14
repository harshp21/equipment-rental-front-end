import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../axios';
import { ProductContext } from '../../context/product-context/product-context';
import DateTimeRangePicker from '../date-time-range-picker/DateTimeRangePicker';
import './cart-product.css'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

function CartProduct({ cartProduct }) {

    const axios = axiosInstance();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(cartProduct.quantity);

    const intialDateRamge = {
        start: cartProduct.bookedFrom,
        end: cartProduct.bookedTo,
    }
    const [dateRange, setDateRange] = useState(intialDateRamge);

    const productContext = useContext(ProductContext);

    const fetchCartProduct = async () => {
        const result = await axios.get(`/products/product/${cartProduct.productId}`);
        setProduct(result.data.product);
    }
    useEffect(() => {
        fetchCartProduct();
    }, []);


    const onDateRangeChange = (dateRange) => {
        setDateRange(dateRange);
        updateCart(quantity, dateRange);
    }

    const updateCart = (quantity, dateRange) => {
        productContext.updateCart(product, quantity, dateRange);
    }

    const onChangeHandler = (e) => {
        setQuantity(e.currentTarget.value);
        updateCart(e.currentTarget.value, dateRange);
    }

    const handleRemoveFromCart = () => {
        productContext.removeFromCart({
            _id: cartProduct.productId, pricing: cartProduct.pricing
        });
    }

    return (
        <div className="cart-product">
            <div className="cart-product__image" >
                <img alt="cart-product" src="https://wallpaperaccess.com/full/2076086.jpg"></img>
            </div>
            <div className="cart-product-details">
                <div className="cart-product__title">{product.productTitle}</div>
                <div className="cart-product__subtitle">{product.productDescription}</div>
                <div className="cart-product__manufactoring">
                    <div className="cart-product__manufactoring-details"><b>Model no</b> : {product.manufactureDetails && product.manufactureDetails.model_number}</div>
                    <div className="cart-product__manufactoring-details"><b>Release Date</b> : {product.manufactureDetails && product.manufactureDetails.release_date}</div>
                    <div className="cart-product__manufactoring-details"><b>Brand</b> : {product.manufactureDetails && product.manufactureDetails.brand}</div>
                </div>
                <div className="cart-product__pricing">
                    <b>Price (per day)</b> :
                    <div className="cart-product__pricing_currency">  {product.pricing && product.pricing.currency}</div>
                    <div className="cart-product__pricing_amount">  {product.pricing && product.pricing.productPrice}</div>
                </div>
                <div className="cart-product__pricing_quantity">
                    <b>Quantity</b> :
                    <input type="number" min={1} value={quantity} max={product.quantityAvailable} onChange={(e) => onChangeHandler(e)} />
                </div>
                <div className="cart-product__date-range">
                    <b>Select a date from when you have to rent the products</b>
                    <DateTimeRangePicker
                        onChangeHandler={(dateRange) => onDateRangeChange(dateRange)}
                        className='date-time-range-picker'
                        startDate={dateRange.start}
                        endDate={dateRange.end}
                    />
                </div>
                <div className="cart-product__remove-from-cart" onClick={handleRemoveFromCart}>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CartProduct)
