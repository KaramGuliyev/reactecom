import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import Button from "../forms/Buttons/Buttons";
import "./productcard.scss"
import { addProduct } from './../../redux/Cart/cart.actions';


const mapState = state => ({
    product: state.productsData.product
});

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const {productID} = useParams();
    const { product } = useSelector(mapState);
    
    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc,
    } = product;

    useEffect(() => {
        dispatch(fetchProductStart(productID))

        return () => {
            dispatch(setProduct);
        }
    }, []);

    const handleAddToCart = (product) => {
        if(!product) return;

        dispatch(
            addProduct(product)
        )
    }

    const configAddToCartBtn = {
        type: 'button',

    }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            ${productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={()=> handleAddToCart(product)}>
                                Add To Cart
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span 
                            dangerouslySetInnerHTML={{__html: productDesc}} 
                        />
                            
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductCard;