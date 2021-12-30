import { React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../../redux/Products/products.actions';
import Product from './product/product';
import './productstyles.scss';
const mapState = ({ productsData }) => ({
    products: productsData.products
})
const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchProductsStart()
            )
    }, [])

    if (!Array.isArray(products)) return null;
    if (products.length < 1 ) {
        return (
            <div className="products">
                <p>No Search results.</p>
            </div>  
        );
    }
    return (
        <div className="products">

            <h1 className='h1'> Browse Products </h1>
            <div className="productResults">
            {products.map((product, pos) => {
                const { productThumbnail, productName, productPrice } = product;
                if(!productThumbnail || !productName || typeof productPrice === 'undefined')
                    return <p>potato</p>;

                const configProduct = {
                    productThumbnail, 
                    productName, 
                    productPrice,
                }
                return (
                    <Product {...configProduct} />
                    
                );
            })}
            </div>
        </div>
    )
};

export default ProductResults;
