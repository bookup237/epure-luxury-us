import React from 'react';

const About: React.FC = () => (
  <div>
    {/* Hero */}
    <section
      className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&h=900&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold font-['Playfair_Display'] mb-4">About Us</h1>
        <p className="text-lg tracking-widest uppercase">Our Story & Heritage</p>
      </div>
    </section>

    {/* Story */}
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-4">
          A Legacy of Luxury
        </h2>
        <div className="w-20 h-1 bg-[#b8860b] mx-auto mb-6" />
      </div>

      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          Founded in 1985, <strong>Samara's Furs</strong> has been at the forefront of luxury fur and outerwear
          fashion in the United States. For nearly four decades, we have been dedicated to providing our clients
          with the finest quality furs, sourced ethically and crafted with meticulous attention to detail.
        </p>
        <p>
          Our master furriers bring generations of expertise to every piece we create. Each garment is a
          work of art, blending timeless elegance with contemporary design to create pieces that are as
          unique as the individuals who wear them.
        </p>
        <p>
          Based in the heart of New York City, our flagship showroom offers an intimate and luxurious
          shopping experience. We invite you to visit us and discover the art of fine fur craftsmanship.
        </p>
      </div>
    </section>

    {/* Values */}
    <section className="bg-[#f9f6f1] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <span className="text-4xl mb-4 block">🌿</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Ethical Sourcing</h3>
            <p className="text-sm text-gray-500">
              We are committed to responsible and ethical sourcing practices,
              ensuring the highest standards of animal welfare and sustainability.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <span className="text-4xl mb-4 block">✂️</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Master Craftsmanship</h3>
            <p className="text-sm text-gray-500">
              Every piece is handcrafted by our skilled artisans, who bring decades
              of experience and passion to their work.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <span className="text-4xl mb-4 block">💎</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 font-['Playfair_Display']">Timeless Design</h3>
            <p className="text-sm text-gray-500">
              Our designs transcend trends, offering classic elegance that remains
              beautiful and relevant for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
