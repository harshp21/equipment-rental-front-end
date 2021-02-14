import React, { useEffect, useContext, useRef } from 'react';
import './home.css';
import CategoryCard from '../category-card/CategoryCard';
import { ProductContext } from '../../context/product-context/product-context';

function Home() {

    const productContext = useContext(ProductContext);
    const productContectRef = useRef(productContext);

    useEffect(() => {
        productContectRef.current.fetchCategories();
    }, [])

    return (
        <div className="home">
            <div className="home__header">
                <img alt="home-header" src="https://wallpaperaccess.com/full/2076086.jpg"></img>
            </div>
            <div className="home__content">
                <div className="home__content_title">Browse Category</div>
                <div className="home__content_sub-title">
                    Rentickle offers a unique range of stylish, trendy and ultra-modern products at affordable rentals. We are committed to serve our customers with the widest range in home furniture and appliances. Our furniture is intelligently designed to give both comfort and functionality.
                </div>
                <div className="home__content_categories">
                    {
                        productContext.productState.categories.map((category) => {
                            return <CategoryCard key={category._id} category={category} className="cards"></CategoryCard>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
