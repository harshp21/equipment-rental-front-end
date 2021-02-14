import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/product-context/product-context'
import ProductList from '../product-list/ProductList';
import './product-container.css';

function ProductsContainer() {

    const productContext = useContext(ProductContext);
    const [filterCatergoryIds, setFilterCategoryIds] = useState([]);

    useEffect(() => {
        productContext.fetchProducts();
        productContext.fetchCategories();
    }, []);

    const onSelectHandler = (categoryId) => {
        if (!filterCatergoryIds.includes(categoryId)) {
            const categoryIds = [...filterCatergoryIds, categoryId];
            productContext.filterProducts(categoryIds);
            setFilterCategoryIds(categoryIds);
        } else {
            filterCatergoryIds.splice(filterCatergoryIds.indexOf(categoryId), 1);
            setFilterCategoryIds(filterCatergoryIds);
            productContext.filterProducts(filterCatergoryIds);
        }
    }


    return (
        <div className="product-container">
            <div className="product-container__filter">
                <div className="product-container__filter_title">Categories</div>
                <div className="product-container__filter_content">
                    {
                        productContext.productState.categories.map((category) => {
                            return <div className="filter_tag" key={category._id}>
                                <input type="checkbox" onChange={() => onSelectHandler(category._id)} />
                                <div className="filter_label" >{category.categroryName}</div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="product-container__product-list">
                <ProductList products={productContext.productState.filteredProducts} />
            </div>

        </div>
    )
}

export default ProductsContainer
