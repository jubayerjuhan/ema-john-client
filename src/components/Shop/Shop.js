import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Products/Product'
import Cart from "./../Cart/Cart";
import { addToDatabaseCart } from '../../utilities/databaseManager.js';

const Shop = () => {

    const firstTen = fakeData.slice(0, 10);

    const [products, setProducts] = useState(firstTen);
    console.log(products)
    const [cart, setCart] = useState([]);
    console.log(cart);
    console.log(setProducts)

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);

        const sameProduct = newCart.filter(pd => pd.key === product.key)
        const count = sameProduct.length;
        
        addToDatabaseCart(product.key, count)
        console.log(setCart);
    }

    return (
        <div className='shopContainer'>
            <div className="productContainer">

                {
                    products.map(pds =>
                        <Product
                            key = {pds.key}
                            handleAddProduct={handleAddProduct}
                            showAddToCart = {true}
                            productss={pds}>
                        </Product>)
                }

            </div>

            <div className="cartContainer">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;