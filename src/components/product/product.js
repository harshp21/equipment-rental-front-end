import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProductContext } from '../../context/product-context/product-context';
import { UserContext } from '../../context/user-context/user-context';
import { toast } from 'react-toastify';
import './product.css';

function Product({ product }) {

    const productContext = useContext(ProductContext);
    const userContext = useContext(UserContext);
    const history = useHistory(null);
    const isProductAddedToCart = productContext.productState.cart.cartProducts.some((cartProduct) => cartProduct.productId === product._id);

    const handleAddToCart = () => {
        if (userContext.userState.isLoggedIn) {
            productContext.addToCart(product);
        } else {
            toast.info('You need to login to add to cart');
            history.push('/sign-in');
        }
    }

    const handleRemoveFromCart = () => {
        if (userContext.userState.isLoggedIn) {
            productContext.removeFromCart(product)
        } else {
            history.push('/sign-in');
        }
    }
    return (
        <div className="product__card">
            <div className="product__image">
                <img src='https://picsum.photos/200/300' alt="" />
            </div>
            <div className="product__card_title">{product.productName}</div>
            <div className="product__card_description">Modo eros usu ei, his et modus ocurreret, nam id omnes congue postea. Vis affert lucilius sententiae ne, ut odio magna repudiare has, impedit vocibus per ei. Epicurei apeirian appellantur has et. Mel nostro fastidii adversarium ut.</div>
            <div className="product__card_price">
                Price (per day):
                <div className="product-currency">
                    {product.pricing.currency}
                </div>
                <div className="product-amount">
                    {product.pricing.productPrice}
                </div>
            </div>
            { isProductAddedToCart ?
                <div className="product__remove-from-cart" onClick={handleRemoveFromCart}>
                    Remove
                </div>
                :
                <div className="product__add-to-cart" onClick={handleAddToCart}>
                    Add To Cart
                </div>
            }
        </div>
    )
}

export default Product
