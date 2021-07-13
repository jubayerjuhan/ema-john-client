import React from 'react';

const ReviewCartItem = (props) => {
    const product = props.cartproduct;

    const {key, name, price, quantity,seller, img} = product;

    return (
        <div className='product'>
            <div className='productsImage'>
                <img src={img} alt="" srcset="" />
            </div>

            <div className='productDetails'>
                <h4 className='productName'>{name}</h4>
                <p>Price: {price}</p>
                <p>Ordered: {quantity} Piece/s</p>
                <button className="remove-btn addToCartBtn">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewCartItem;