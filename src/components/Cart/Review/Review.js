import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../../utilities/databaseManager.js';
import fakeData from "./../../../fakeData/index";
import ReviewCartItem from "./../../ReviewCartItem/ReviewCartItem";
import Cart from "./../Cart";
import { Link } from 'react-router-dom';
import happyImage from '../../../images/giphy.gif'

const Review = () => {

    const [cart, setCart] = useState([]);
    const [placeOrder, setPlaceOrder] = useState(false)

    const handleRemoveProduct = (removedProductKey) => {
        const newCart = cart.filter(pd => pd.key !== removedProductKey)
        setCart(newCart);

        removeFromDatabaseCart(removedProductKey);
    }


    // Generating Product Keys To remove The products
    // const keys = [];
    // cart.map((product) =>
    //     keys.push(product.key)
    // )
    // console.log(keys)


    // // removing products
    // const handlePlaceOrder = () => {
    //     keys.map((key) =>
    //         removeFromDatabaseCart(key)
    //     )
    // }
    const handlePlaceOrder = () =>{

        setCart([]);
        processOrder(cart);
        setPlaceOrder(true);
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
    
    let thankYou;

    if (placeOrder) {
        thankYou = <img src={happyImage} alt="" srcset="" />
    }

    return (
        <>
            <h1>Review Cart Items</h1>
            <div className="twinContainer">
                <div className="productContainer">
                    {thankYou}
                    {
                        cart.map(cartProduct => <ReviewCartItem handleRemoveProduct={handleRemoveProduct} key={cartProduct.key} cartproduct={cartProduct}></ReviewCartItem>)
                    }
                </div>

                <div className="cartContainer">
                    <Cart cart={cart}>
                        <Link>
                            <button onClick={handlePlaceOrder} className="reviewCart">Place Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Review;