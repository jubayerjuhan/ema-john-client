import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from "./../../fakeData/index";
import Products from "./../Products/Product";

const ProductDetail = () => {
    const {productKey} = useParams();
    console.log(productKey);

    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);

    return (
        <div>
            <h1>Product Details</h1>
            <Products showAddToCart={false} productss = {product}></Products>
        </div>
    );
};

export default ProductDetail;