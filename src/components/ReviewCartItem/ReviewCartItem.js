import React from 'react';

const ReviewCartItem = (props) => {
    const product = props.cartproduct;
    const { name, price, quantity, key, img} = product;

    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }

    console.log(product)
    return (
        <div style={reviewItemStyle} className='product'>
            <div className='productsImage'>
                <img src={img} alt="" srcset="" />
            </div>

            <div className='productDetails'>
                
                <h4 className='productName'>{name}</h4>
                <p>Price: {price}</p>
                <p>Ordered: {quantity} Piece/s</p>
                <button onClick ={()=>props.handleRemoveProduct(key)} className="remove-btn addToCartBtn">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewCartItem;