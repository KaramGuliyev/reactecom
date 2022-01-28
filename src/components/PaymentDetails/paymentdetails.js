import React, {useState, useEffect} from "react";
import FormInput from "../forms/FormInput/forminput";
import Button from "../forms/Buttons/Buttons";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { apiInstance } from "../../utils/utils";
import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/Cart/cart.actions';
import { useHistory } from 'react-router-dom';
import { saveOrderHistory } from './../../redux/Orders/orders.actions';
import './paymentdetailsstyles.scss';

const initalAddressState = {
    city: '',
    country: '',
    line1: '',
    line2: '',
    postal_code: '',
    state: '',
};

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems,
});

const PaymentDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const elements = useElements();
    const stripe = useStripe();
    const {total, itemCount, cartItems} = useSelector(mapState);
    const [billingAddress, setBillingAddress] = useState({...initalAddressState});
    const [shippingAddress, setShippingAddress] = useState({...initalAddressState});
    const [recipientName, setRecipientName] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    useEffect(()=> {
        if(itemCount < 1) {
            history.push('/dashboard')
        }
    }, [itemCount])
    
const handleShipping = evt => {
        const {name, value} = evt.target;
        setShippingAddress ({
            ...shippingAddress,
            [name]: value
        });
    };

const handleBilling = evt => {
    const {name, value} = evt.target;
    setBillingAddress({
        ...billingAddress,
        [name]: value,
    });
};

const handleFormSubmit = async evt => {
        evt.preventDefault();

        const cardElement = elements.getElement('card')
        if(    !shippingAddress.line1 
            || !shippingAddress.city 
            || !shippingAddress.state 
            || !shippingAddress.postal_code 
            || !shippingAddress.country
            || !billingAddress.line1 
            || !billingAddress.city 
            || !billingAddress.state 
            || !billingAddress.postal_code 
            || !billingAddress.country
            || !recipientName
            || !nameOnCard
        ) {
            return;
        }


        apiInstance.post(`/payments/create`, {
            amount: total*100,
            shipping: {
                address: {
                    ...shippingAddress
                },
            name: recipientName,
            }
        }).then(({data: clientSecret}) => {
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: nameOnCard,
                    address: {
                        ...billingAddress
                    }
                }
            }).then(({ paymentMethod }) => {

                stripe.confirmCardPayment(clientSecret, 
                    {
                        payment_method: paymentMethod.id
                    }).then(({ paymentIntent }) => {
                       
                        const configOrder = {
                            orderTotal: total,
                            orderItems: cartItems.map(item => {
                                const {
                                    documentID, 
                                    productThumbnail, 
                                    productName, 
                                    productPrice,
                                    quantity,
                                } = item;
                                return {
                                    documentID,
                                    productThumbnail,
                                    productName,
                                    productPrice,
                                    quantity,
                                };
                            })
                        }
                        dispatch (saveOrderHistory(configOrder))
                    })
            });
        });
    };

const configCardElement = {
    iconStyle : 'solid',
    style: {
        base: {
            fontSize: '16px'
        }
    },
    hidePostalCode: true,
};
    

    return (
        <div className="paymentDetails">
            <form onSubmit={handleFormSubmit}>

                <div className="group">
                    <h2>Shipping Address</h2>

                    <FormInput
                        required 
                        placeholder="Recipient Name"
                        name='recipientName'
                        handleChange={evt => setRecipientName(evt.target.value)}
                        value = {recipientName}
                        type="text"
                        />

                    <FormInput 
                        required
                        placeholder="Line 1"
                        name="line1"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.line1}
                        type="text"
                        />

                    <FormInput 
                        placeholder="Line 2"
                        name="line2"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.line2}
                        type="text"
                        />

                    <FormInput 
                        required
                        placeholder="City"
                        name="city"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.city}
                        type="text"
                        />

                    <FormInput 
                        required
                        placeholder="State"
                        name="state"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.state}
                        type="text"
                        />

                    <FormInput 
                        required
                        placeholder="Postal Code"
                        name="postal_code"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.postal_code}
                        type="text"
                        />
                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            required 
                            onChange={val => handleShipping({
                                target: {
                                    name: 'country',
                                    value: val,
                                }
                            })}
                            value={shippingAddress.country}
                            valueType="short"
                        />
                    </div>

                </div>
                
                <div className="group">
                    <h2>Billing Address</h2>
                    <FormInput 
                        required
                        placeholder="Name on Card"
                        name="nameOnCard"
                        handleChange={evt => setNameOnCard(evt.target.value)}
                        value={nameOnCard}
                        type="text"
                        />

                    <FormInput 
                        placeholder="Line 1"
                        required
                        name="line1"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.line1}
                        type="text"
                        />

                    <FormInput 
                        placeholder="Line 2"
                        name="line2"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.line2}
                        type="text"
                        />

                    <FormInput 
                        placeholder="City"
                        required
                        name="city"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.city}
                        type="text"
                        />

                    <FormInput 
                        placeholder="State"
                        name="state"
                        required
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.state}
                        type="text"
                        />

                    <FormInput 
                        placeholder="Postal Code"
                        required
                        name="postal_code"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.postal_code}
                        type="text"
                        />

                    <div className="formRow checkoutInput">
                        <CountryDropdown
                            required
                            onChange={val => handleBilling({
                                target: {
                                    name: 'country',
                                    value: val,
                                }
                            })}
                            value={billingAddress.country}
                            valueType="short"
                        />
                    </div>
                </div>
                
                <div className="group">
                    <h2>Card Details</h2>

                    <CardElement 
                        options={configCardElement}
                    />
                </div>
                <Button type="submit">Pay Now</Button>
            </form>
        </div>
    );
};

export default PaymentDetails;
