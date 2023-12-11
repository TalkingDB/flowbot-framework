import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const StripeComponent = ({onClose}: {onClose: (value: string)=>void}) => {
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""))
  }, [])

  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);


  return (
    <div style={{width: "520px"}}>
    {clientSecret && stripePromise && 
    <Elements stripe={stripePromise} options={{clientSecret: clientSecret }}>
      <CheckoutForm onClose={onClose}/>
    </Elements>}
    </div>
  );
};

export default StripeComponent;