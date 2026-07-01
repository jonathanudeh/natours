import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_BUkd0ZXAj6m0q0jMyRgBxNns00PPtgvjjr');

export const bookTour = async (tourId) => {
  console.log('booktour func');

  try {
    // 1 Get checkout session from API
    const session = await axios(
      `https://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`,
    );

    // 2 Use stripe obj to create the checkoit form and charge the card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
