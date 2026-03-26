import React, { useState } from 'react'
import API from '../Api.js';

function Contact() {


  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) =>
  {
    e.preventDefault();
    try {
      await API.post('/contact', {
        firstName,
        lastName,
        email,
        message,
      })

      alert("Message sent successfully");
    } catch (error) {
      console.log(error);

      alert(`Error!: ${error.response?.data?.message}`);
    }
  }

  return (
    <div className=" flex justify-center items-center px-6 mt-12">
      <div className="flex flex-col md:flex-row gap-16 w-full max-w-5xl">

        {/* Left Side */}
        <div className="text-white flex-1">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-gray-200">
            Need to get in touch with us? Fill out the form and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 bg-white p-8 rounded-xl shadow-lg max-w-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input value={firstName} onChange={(e) => setfirstName(e.target.value)}
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                What can we help you with?
              </label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact
