import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { ProductContext } from '../../context/product-context/product-context'
import CartProduct from '../cart-product/CartProduct';
import RazorPay from '../razor-pay/RazorPay';
import './cart.css';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/user-context/user-context';

function Cart() {

    const productContext = useContext(ProductContext);
    const userContext = useContext(UserContext);
    const history = useHistory();

    const paymentData = {
        products: productContext.productState.cart.cartProducts,
        totalAmount: productContext.productState.cart.totalCartAmount,
        name: userContext.userState.user.username,
        email: userContext.userState.user.emailId
    }

    const areProductAvailable = productContext.productState.cart.cartProducts.length !== 0;

    const onPaymentCallback = () => {
        productContext.clearCart();
        toast.success('Product ordered Successfully');
        history.push('/orders');
    }
    return (
        <div className="cart">
            <div className="cart-details">
                <div className="cart-details__container">
                    <div className="cart-details__title">Shopping cart</div>
                    {
                        areProductAvailable ?
                            productContext.productState.cart.cartProducts.map((product, index) => {
                                return <CartProduct key={product.productId} cartProduct={product} />
                            }) :
                            <div className="cart-details_content"> No products available in cart</div>
                    }
                </div>
                <div className="cart-details__summary">
                    <div className="cart-details__summary_title">Summary</div>
                    <div className="cart-details__summary_content">
                        <div className="content_items">Total Items : {productContext.productState.cart.cartProducts.length}</div>
                        <div className="content-item-details">{productContext.productState.cart.cartProducts.map((product) => {
                            return <React.Fragment key={product._id}>
                                <div className="cart-details_content">
                                    <div className="content_pricing">
                                        {product.productName}  [ x {product.quantity}]
                                    </div>
                                    <span> :: </span>
                                    <div className="content_pricing-amount">
                                        {product.pricing.currency}{product.pricing.productPrice}
                                    </div>
                                    <div className="content_no-of-days">
                                        (<b>Days</b> : {(new Date(product.bookedTo).getTime() - new Date(product.bookedFrom).getTime()) / (1000 * 3600 * 24)})
                                    </div>
                                </div>
                            </React.Fragment>
                        })}</div>
                        <div className="content_amount">Total :$ {productContext.productState.cart.totalCartAmount}</div>
                        <div className="content_checkout">
                            <RazorPay
                                paymentData={paymentData}
                                isDisabled={!areProductAvailable}
                                onPaymentCallback={onPaymentCallback} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
