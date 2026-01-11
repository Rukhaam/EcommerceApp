import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripes = price * 100;
    
    // Access the key from the environment
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

    const onToken = token => {
        console.log(token);
        alert('payment done');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Rukhaams Shopping'
            billingAddress
            shippingAddress
            image=''
            description={`Your total is $${price}`}
            amount={priceForStripes}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;