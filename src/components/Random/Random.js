import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Products/Product'

const Shop = () => {
    
    const firstTen = fakeData.slice(0,10);

    const [products, setProducts] = useState(firstTen);
    

    return (
        <div className = 'shopContainer'>
            <div className="productContainer">

                {
                    products.map(pds => <Product product = {pds}></Product>)
                }
                    
            </div>

            <div className="cartContainer">
                <h3>This Is Cart</h3>
            </div>
            
        </div>
    );
};

export default Shop;