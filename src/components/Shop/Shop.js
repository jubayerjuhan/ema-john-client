import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Products/Product'
import Cart from "./../Cart/Cart";
import Header from "./../Header/Header";


const Shop = () => {
    
    const firstTen = fakeData.slice(0,10);

    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
    
    const handleAddProduct = (product) =>{
        console.log('Product Added', product);
        const newCart = [...cart, product];
        setCart(newCart);
        console.log(setCart);
    }

    return (
        <div className = 'shopContainer'>
            <div className="productContainer">

                {
                    products.map(pds => 
                        <Product
                            handleAddProduct = {handleAddProduct}
                            productss = {pds}>
                        </Product>)
                }
                    
            </div>

            <div className="cartContainer">
                <Cart></Cart>
            </div>
            
        </div>
    );
};

export default Shop;