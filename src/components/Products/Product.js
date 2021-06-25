import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Products = (props) => {
    const {img, name, seller, price, stock} = props.productss;
    console.log(props);
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
                
                <button 
                    className = 'addToCartBtn'
                    onClick = {()=> props.handleAddProduct(props.productss)}
                >
                    <FontAwesomeIcon icon={faShoppingCart}/> Add To Cart
                </button>
            </div>
        </div>
    );
};

export default Products;