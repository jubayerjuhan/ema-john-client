import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../../utilities/databaseManager.js';
import fakeData from "./../../../fakeData/index";
import ReviewCartItem from "./../../ReviewCartItem/ReviewCartItem";
import Cart from "./../Cart";

const Review = () => {

    const [cart, setCart] = useState([]);

    const handleRemoveProduct = (removedProductKey) => {
        const newCart = cart.filter(pd => pd.key !== removedProductKey)
        setCart(newCart);

        removeFromDatabaseCart(removedProductKey);
    }
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProducts);
        console.log(savedCart);
    }, [])


    return (
        <>
            <h1>Review Cart Items</h1>
            <div className="twinContainer">
                <div className="productContainer">
                    {
                        cart.map(cartProduct => <ReviewCartItem handleRemoveProduct={handleRemoveProduct} key={cartProduct.key} cartproduct={cartProduct}></ReviewCartItem>)
                    }
                </div>

                <div className="cartContainer">
                    <Cart cart = {cart}>
                        <button className="reviewCart">Place Order</button>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Review;