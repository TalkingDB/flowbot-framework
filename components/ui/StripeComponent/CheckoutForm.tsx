import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import Button from '../Buttons/Button';

const CheckoutForm = ({onClose}: {onClose:  (value: string)=>void;}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: 'if_required'
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // console.log("result paymentIntent ===>", result.paymentIntent)
        onClose(JSON.stringify(result))
    } else {
        console.log("unexpected result", result)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className='mt-4'>
      <Button disabled={!stripe}>Submit</Button>
      </div>
    </form>
  )
};

export default CheckoutForm;