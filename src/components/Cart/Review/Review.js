import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../../utilities/databaseManager.js';
import fakeData from "./../../../fakeData/index";
import ReviewCartItem from "./../../ReviewCartItem/ReviewCartItem";

const Review = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProducts);
        console.log(cart);
    }, [])


    return (
        <div>
            <h1>Placeholders For Review Path</h1>
            {
                cart.map(cartProduct => <ReviewCartItem cartproduct = {cartProduct}></ReviewCartItem>)
            }
        </div>
    );
};

export default Review;