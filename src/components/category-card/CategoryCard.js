import React from 'react';
import './category-card.css';

function CategoryCard({ category }) {
    return (
        <div className="category__card">
            <div className="category__card_img">
                <img src={category.categoryImage} alt="" />
            </div>
            <div className="category__card_title">{category.categroryName}</div>
            <div className="category__card_description">{category.categoryDescription}</div>
        </div>
    )
}

export default CategoryCard
