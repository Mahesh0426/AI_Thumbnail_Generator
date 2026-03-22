import React, { useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import toast from "react-hot-toast";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
              Get in Touch
            </h1>
            <p className="text-zinc-400 text-lg">
              Have questions, feedback, or need support? We're here to help.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-100"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-white/12 bg-white/8 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-100"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-white/12 bg-white/8 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-100"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={6}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-white/12 bg-white/8 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-blue-500 to-blue-600 hover:from-blue-700 disabled:cursor-not-allowed transition-colors mt-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactUsPage;
