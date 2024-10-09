import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ShippingInfoSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
});

const ShippingInfo: React.FC = () => {
  const { user, updateShippingInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div>Please log in to view your shipping information.</div>;
  }

  const initialValues = {
    address: user.shippingInfo?.address || '',
    city: user.shippingInfo?.city || '',
    state: user.shippingInfo?.state || '',
    zipCode: user.shippingInfo?.zipCode || '',
    country: user.shippingInfo?.country || '',
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
      {isEditing ? (
        <Formik
          initialValues={initialValues}
          validationSchema={ShippingInfoSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateShippingInfo(values);
              setIsEditing(false);
            } catch (error) {
              console.error('Failed to update shipping information:', error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <Field
                  type="text"
                  name="city"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <Field
                  type="text"
                  name="state"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <Field
                  type="text"
                  name="zipCode"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Field
                  type="text"
                  name="country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="space-y-4">
          {user.shippingInfo ? (
            <>
              <div>
                <span className="block text-sm font-medium text-gray-700">Address</span>
                <span className="block mt-1">{user.shippingInfo.address}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">City</span>
                <span className="block mt-1">{user.shippingInfo.city}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">State</span>
                <span className="block mt-1">{user.shippingInfo.state}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">ZIP Code</span>
                <span className="block mt-1">{user.shippingInfo.zipCode}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">Country</span>
                <span className="block mt-1">{user.shippingInfo.country}</span>
              </div>
            </>
          ) : (
            <p>No shipping information available.</p>
          )}
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {user.shippingInfo ? 'Edit Shipping Information' : 'Add Shipping Information'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;