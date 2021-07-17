import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Products/Product'
import Cart from "./../Cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager.js';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);

    const [products, setProducts] = useState(firstTen);
    console.log(products)
    const [cart, setCart] = useState([]);
    console.log(cart);
    console.log(setProducts) 

    //Loading Data Using UseEffect For Cart

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const keyvalues = Object.values(savedCart)
        console.log(productKeys);
        console.log(keyvalues);
        
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product;

        });
        setCart(cartProducts)

    },[])

    ////////////////////////////////////////
    
    const handleAddProduct = (product) => {
        const toBeadded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeadded)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const othersProduct = cart.filter(pd => pd.key !== toBeadded)
            newCart = [...othersProduct, sameProduct]
        }

        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }

        setCart(newCart);
        addToDatabaseCart(toBeadded, count);

       
        
    }
    return (
        <div className='twinContainer'>
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