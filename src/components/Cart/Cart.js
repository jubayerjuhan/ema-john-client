import React from 'react'
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);

    //Total Price Calculating
    // const total = cart.reduce((totalPrice, prd) => totalPrice+prd.price+prd.shipping, 0)
    // const totalPrice = total.toFixed(2)
    // console.log(total);
    // console.log(totalPrice);

    /**
     * !Total Using For Loop
     */
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        // debugger;
    }
    const totalFixed = total.toFixed(2)

    /**
     * !Shipping Using For Loop
     */
    let shippingCost = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        shippingCost = shippingCost + product.shipping
    }
    // console.log(shippingCost)

    /**
     * !Shipping And Price
     */
    const shippingAndPrice = total + shippingCost;
    const priceBeforeTax = shippingAndPrice.toFixed(2)


    /**
     * !Tax Calculating
     */
    const tax = priceBeforeTax / 100 * 10
    // console.log(tax)


    /**
     * !Grand Total
     */
    const orderTotal = (total + shippingCost + tax).toFixed(2);

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: <b>{cart.length}</b></p>

            <div className="cartInfoBottom">
                <p classNameh>Items: <b>${totalFixed}</b></p>
                <p>Shipping & Handling: ${shippingCost.toFixed(2)}</p>
                <p>Total Before Tax: ${priceBeforeTax}</p>
                <h4>Order Total: ${orderTotal}</h4>
            </div>
            {props.children}
            

        </div>
    );
};

export default Cart;
