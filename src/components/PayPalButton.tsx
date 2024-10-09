import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      components: "buttons"
    }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then((details) => {
            onSuccess(details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;