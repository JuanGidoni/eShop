import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
})

const ContactUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg text-gray-500 mb-4">
            We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
          </p>
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Our Office</h2>
            <p className="text-gray-500">
              123 E-Shop Street<br />
              Techville, TX 12345<br />
              United States
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Contact Information</h2>
            <p className="text-gray-500">
              Email: info@eshop.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div>
          <Formik
            initialValues={{ name: '', email: '', message: '' }}
            validationSchema={ContactSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // Here you would typically send the form data to your backend
              console.log(values)
              alert('Thank you for your message. We will get back to you soon!')
              resetForm()
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Field name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Field name="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Field name="message" as="textarea" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                  <ErrorMessage name="message" component="div" className="mt-1 text-sm text-red-600" />
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ContactUs