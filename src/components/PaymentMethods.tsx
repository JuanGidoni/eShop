import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PaymentMethodSchema = Yup.object().shape({
  cardNumber: Yup.string().required('Required').matches(/^\d{16}$/, 'Must be 16 digits'),
  cardHolder: Yup.string().required('Required'),
  expirationDate: Yup.string().required('Required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Must be in MM/YY format'),
  cvv: Yup.string().required('Required').matches(/^\d{3,4}$/, 'Must be 3 or 4 digits'),
});

const PaymentMethods: React.FC = () => {
  const { user, addPaymentMethod, removePaymentMethod } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  if (!user) {
    return <div>Please log in to view your payment methods.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
      {user.paymentMethods && user.paymentMethods.length > 0 ? (
        <div className="space-y-4">
          {user.paymentMethods.map((method, index) => (
            <div key={index} className="border rounded-md p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Card ending in {method.cardNumber.slice(-4)}</p>
                <p className="text-sm text-gray-600">{method.cardHolder}</p>
                <p className="text-sm text-gray-600">Expires {method.expirationDate}</p>
              </div>
              <button
                onClick={() => removePaymentMethod(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No payment methods added yet.</p>
      )}
      {isAdding ? (
        <Formik
          initialValues={{ cardNumber: '', cardHolder: '', expirationDate: '', cvv: '' }}
          validationSchema={PaymentMethodSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await addPaymentMethod(values);
              setIsAdding(false);
              resetForm();
            } catch (error) {
              console.error('Failed to add payment method:', error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-4 space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <Field
                  type="text"
                  name="cardNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                  Card Holder
                </label>
                <Field
                  type="text"
                  name="cardHolder"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="cardHolder" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
                  Expiration Date (MM/YY)
                </label>
                <Field
                  type="text"
                  name="expirationDate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="expirationDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <Field
                  type="text"
                  name="cvv"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="cvv" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Payment Method
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Payment Method
        </button>
      )}
    </div>
  );
};

export default PaymentMethods;