import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PersonalInfoSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const PersonalInfo: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div>Please log in to view your personal information.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      {isEditing ? (
        <Formik
          initialValues={{ name: user.name, email: user.email }}
          validationSchema={PersonalInfoSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateUser(values);
              setIsEditing(false);
            } catch (error) {
              console.error('Failed to update user information:', error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
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
          <div>
            <span className="block text-sm font-medium text-gray-700">Name</span>
            <span className="block mt-1">{user.name}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Email</span>
            <span className="block mt-1">{user.email}</span>
          </div>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Information
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;