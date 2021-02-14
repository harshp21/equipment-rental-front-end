import React from 'react';
import Product from '../product/product';
import './product-list.css';

function ProductList({ products }) {
    return (
        <div className="product-list">
            {
                products.map((product) => {
                    return <Product key={product._id} product={product} />;
                })
            }
        </div>
    )
}

export default ProductList
