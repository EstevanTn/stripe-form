// @ts-nocheck
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm/PaymentForm";

// Carga la instancia de Stripe utilizando la clave pública desde las variables de entorno
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    // Proporciona el contexto de Stripe a los componentes hijos
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default App;
