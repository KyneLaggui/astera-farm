// Import dotenv using ES modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configure dotenv to load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to eShop website.");
});

const array = [];

// POST route to create a payment intent
app.post("/create-payment-intent-paymongo", async (req, res) => {
  const { items } = req.body;
  const filteredItems = [];

  items.forEach((item) => {
    const newItem = {
      currency: 'PHP',
      amount: item.price * 100, // Convert price to cents (or smallest currency unit)
      name: item.name,
      quantity: item.cartQuantity,
    };
    filteredItems.push(newItem);
  });

  try {
    const checkoutSession = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Basic c2tfdGVzdF9iNTR6bVYxSFRjSlVXYkcxemZQeUo1Umk6QXN0ZXJhZmFybTEyMQ==', // This should be replaced with your actual key in production
      },
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: false,
            show_description: true,
            show_line_items: true,
            description: "This is the description",
            line_items: filteredItems,
            payment_method_types: ["billease", "gcash", "card", "dob", "dob_ubp", "grab_pay", "paymaya"],
          },
        },
      }),
    });

    const checkoutSessionJSON = await checkoutSession.json();
    res.send({ redirect_url: checkoutSessionJSON.data.attributes.checkout_url });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
