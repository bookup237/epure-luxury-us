import React from 'react';

const Contact: React.FC = () => (
  <div>
    {/* Hero */}
    <section
      className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold font-['Playfair_Display'] mb-4">Contact Us</h1>
        <p className="text-lg tracking-widest uppercase">We'd Love to Hear From You</p>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm uppercase tracking-widest text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#b8860b] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-widest text-gray-500 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#b8860b] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-widest text-gray-500 mb-1">Phone</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#b8860b] transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-sm uppercase tracking-widest text-gray-500 mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-[#b8860b] transition-colors resize-none"
                placeholder="Tell us about your inquiry..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#b8860b] hover:bg-[#d4a843] text-white py-4 text-sm uppercase tracking-widest transition-colors duration-300 rounded"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-800 mb-6">Visit Our Showroom</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-semibold text-gray-800">Address</h4>
                <p className="text-gray-600">123 Fifth Avenue<br />New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="font-semibold text-gray-800">Phone</h4>
                <p className="text-gray-600">+1 (212) 555-0199</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-2xl">✉️</span>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600">info@samarasfurs.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-2xl">🕐</span>
              <div>
                <h4 className="font-semibold text-gray-800">Hours</h4>
                <p className="text-gray-600">
                  Monday – Friday: 10:00 AM – 7:00 PM<br />
                  Saturday: 11:00 AM – 6:00 PM<br />
                  Sunday: By Appointment Only
                </p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-8 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Showroom Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-73.99027788459418!3d40.74127704379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a3f81d549f%3A0xb2a39bb5cacc7da0!2s123%20Fifth%20Ave%2C%20New%20York%2C%20NY%2010003!5e0!3m2!1sen!2sus!4v1635789012345"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
