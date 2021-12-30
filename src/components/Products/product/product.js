import React from "react";
import Button from './../../forms/Buttons/Buttons';

const Product = ({ productThumbnail, productName, productPrice }) => {

    const Product = ({
        productThumbnail, 
        productName, 
        productPrice,
    })

    if(!productThumbnail || !productName || typeof productPrice === 'undefined')
                return <p>potato</p>;
    const configAddToCartBtn = {
        type: 'button',
    }
    return (
        <div className="product">
            <div className="thumb">
                <img src={productThumbnail} alt={productThumbnail} />
            </div>
            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            {productName}
                        </span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span className="price">
                            $ {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button className="btn" {...configAddToCartBtn}>
                                Add to Cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Product;