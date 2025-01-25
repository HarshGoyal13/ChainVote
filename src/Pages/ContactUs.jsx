import { useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import Footer from "../components/Footer";
import axios from "axios";
import Loader from "../components/Loader"

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const { name, email, subject, message } = formData;

    // Basic validation
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all the fields.");
      return;
    }

    const data = { name, email, subject, message };
    setLoading(true);
    setMessage("Wait For sending mail..")

    try {
      const res = await axios.post("http://localhost:8080/voting/contactUs", data);

      if (res.data.success) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        toast.success("Mail sent successfully!");
      } else {
        toast.error("Failed to send mail. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
      setMessage("")
    }
  };

  return (
    <>
      <div className="px-4 mx-auto max-w-screen-md mt-7 bg-gray-900 text-gray-200 py-10 rounded-lg shadow-lg">
        {loading && <Loader message={message}/>}
        <h2 className="text-3xl font-extrabold text-center text-green-400 mb-4">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-400">
          Got a technical issue? Want to send feedback about a beta feature? Let us know!
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              placeholder="Your name"
              value={formData.name}
              className="block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              value={formData.email}
              className="block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              onChange={handleInputChange}
              placeholder="Let us know how we can help you"
              value={formData.subject}
              className="block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
              Your Message
            </label>
            <textarea
              rows={5}
              name="message"
              id="message"
              placeholder="Leave a comment . . ."
              value={formData.message}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`block w-full sm:w-auto px-6 py-2 font-semibold rounded-md focus:outline-none focus:ring ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 text-gray-900 hover:bg-green-600 transition duration-300"
            }`}
            aria-live="polite"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Submit"}
          </button>
        </form>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
