import React from 'react';
import './Product.css'

const Products = (props) => {
    const {img, name, seller, price, stock} = props.product;
    console.log(props.product);
    return (
        <div className= 'product'>
            <div className = 'productsImage'>
                <img src={img} alt="" srcset="" />
            </div>

            <div className = 'productDetails'>
                <h4 className= 'productName'>{name}</h4>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} items left</small></p>
            </div>
        </div>
    );
};

export default Products;