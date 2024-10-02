const Stripe = require("stripe");

const {
  asyncErrorHandler,
  ErrorHandler,
} = require("../../middleware/Error/Utils");

const createStripePaymentIntent = asyncErrorHandler(async (req, res) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = req.body;

  console.log("process.env.STRIPE_SECRET_KEY: ", process.env.STRIPE_SECRET_KEY);

  let totalAmount = amount * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: "PKR",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
    stripeAmount: totalAmount,
    actualAmount: amount,
    currency: paymentIntent.currency,
  });
});

module.exports = { createStripePaymentIntent };
