// @ts-nocheck
import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [successfull, setSuccessfull] = useState(false);

  // Maneja el envío del formulario de pago
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe aún no está cargado
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      // Crea un token de pago utilizando el número de tarjeta y el nombre
      const { token } = await stripe.createToken(cardNumberElement, { name });

      // Envía los detalles del pago al servidor para crear el intent de pago
      const response = await fetch(
        "http://localhost:8000/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount) * 100, // Convierte el monto a centavos
            token,
            name,
          }),
        }
      );
      console.log("response", response);

      if (response.ok) {
        console.log("¡Pago exitoso!");
        // Limpia cualquier error previo después de un tiempo
        setTimeout(() => {
          setError(null);
        }, 3000);
        setSuccessfull(true);
      } else {
        setError("El pago falló. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Método de pago
      </h1>
      {!successfull && (
        <>
          <form
            aria-hidden={successfull}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md min-w-[500px]">
            <div className="mb-4 flex flex-col space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Titular
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre del titular"
                  required
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto a Pagar
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Monto"
                  required
                  min="0.01"
                  step="0.01"
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Tarjeta
                </label>
                <CardNumberElement
                  className="p-3 border border-gray-300 rounded-md w-full"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#495057",
                        "::placeholder": {
                          color: "#6c757d",
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Expiración
                  </label>
                  <CardExpiryElement
                    className="p-3 border border-gray-300 rounded-md w-full"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#495057",
                          "::placeholder": {
                            color: "#6c757d",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <CardCvcElement
                    className="p-3 border border-gray-300 rounded-md w-full"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#495057",
                          "::placeholder": {
                            color: "#6c757d",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!stripe || successfull || !amount}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
              Pagar ${amount || "0.00"}
            </button>
            {error && (
              <div className="mt-4 text-red-500 text-center">{error}</div>
            )}
          </form>
        </>
      )}
      {successfull && (
        <div className="mt-4 text-green-500 text-center">¡Pago exitoso!</div>
      )}
    </div>
  );
};

export default PaymentForm;
