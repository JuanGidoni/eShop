import React from 'react'

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
  },
  {
    question: "Are your products covered by warranty?",
    answer: "Most of our products come with a manufacturer's warranty. The duration and coverage may vary by product. Please check the product description or contact our customer service for specific warranty information."
  }
]

const FAQ: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">Frequently Asked Questions</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{faq.question}</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-sm text-gray-500">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ