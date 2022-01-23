import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import './checkoutstyles.scss'
import Item from "./Item/item";
import Button from './../forms/Buttons/Buttons';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const mapState = createStructuredSelector ({
    cartItems: selectCartItems,
    total: selectCartTotal,
})


const Checkout = ({}) => {

    const { cartItems, total } = useSelector(mapState)

    const emptyCart = 'You have no items in your cart.';
    const history = useHistory();
    return (
        <div className="checkout">
            <h1>
                CHECKOUT
            </h1>

            <div className="cart">

                {cartItems.length > 0 ? (
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                        <table className="checkoutHeader">
                            <tbody>
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>
                            </tbody>
                        </table>
                        </tr>

                        <tr>
                            <table border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    {cartItems.map((item, pos) => {
                                        return (
                                            <tr key={pos}>
                                                <td>
                                                    <Item {...item}/>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </tr>
                        
                        <tr>
                            <table align="right" border="0" cellSpacing="0" cellPadding="10">
                                <tr align="right">
                                    <td>
                                        <h3>
                                            Total : $ {total}
                                        </h3>
                                    </td>
                                </tr>
                                <table border="0" cellPadding="10" cellSpacing="0">
                                    <tbody  className="cartBtns">
                                        <tr>
                                            <td>
                                                <Link onClick={()=> history.goBack()}>
                                                    <Button>Continue to shopping</Button>
                                                </Link>
                                            </td>
                                            <td>
                                                <Button onClick={() => history.push('/payment')}>Checkout</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </table>
                        </tr>
                        

                    </tbody>
                </table>
                ) : (
                    <p>
                        {emptyCart}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Checkout;