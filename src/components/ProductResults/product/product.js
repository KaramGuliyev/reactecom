import React from "react";
import { Link } from "react-router-dom";
import Button from './../../forms/Buttons/Buttons';

const Product = ({ documentID, productThumbnail, productName, productPrice }) => {

    if(!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined')
                return <p>potato</p>;
    const configAddToCartBtn = {
        type: 'button',
    }
    return (
        <div className="product">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                    <img src={productThumbnail} alt={productThumbnail} />
                </Link>
            </div>
            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <Link to={`/product/${documentID}`}>
                                {productName}
                            </Link>
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