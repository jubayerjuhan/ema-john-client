import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from "react-router-dom";


const Products = (props) => {
    const product = props.productss;
    const { img, name, seller, price, stock, shipping, key } = product;
    console.log(props);

    
    return (
        <div className='product'>
            <div className='productsImage'>
                <img src={img} alt="" srcset="" />
            </div>

            <div className='productDetails'>
                <h4 className='productName'><Link className = 'textd'to={"/product/" + key}>{name}</Link> </h4>
                <p><small>By: {seller}</small></p>
                <p><small>Shipping: ${shipping}</small></p>
                <p><small>Only {stock} items left</small></p>

                {props.showAddToCart && <button
                    className='addToCartBtn'
                    onClick={() => props.handleAddProduct(props.productss)}>
                    <FontAwesomeIcon icon={faCoffee} />
                    Add To Cart
                </button>}
            </div>
        </div>
    );
};


export default Products;