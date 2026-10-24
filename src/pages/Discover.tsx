import React from 'react';
import { Link } from 'react-router-dom';

const Discover: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Editorial Hero */}
      <div className="relative h-[60vh] md:h-[75vh] bg-[#ede5db] mb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=1000&fit=crop"
          alt="Maison ÉPURE Heritage"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/35 flex flex-col justify-end p-8 md:p-16 text-white max-w-3xl">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/90 mb-3">
            Manifesto & Craftsmanship
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-light leading-tight mb-4">
            The Philosophy of Silent Luxury
          </h1>
          <p className="text-white/90 text-sm md:text-base font-light leading-relaxed max-w-xl">
            Born between Paris and historic European mills, ÉPURE crafts functional art pieces designed to outlast seasons and trends.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8b7355] font-semibold block mb-3">
          Our Heritage
        </span>
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl font-light text-[#1a1a1a] mb-8 leading-snug">
          "True elegance whispers; it never shouts."
        </h2>
        <div className="space-y-6 text-sm md:text-base text-gray-600 font-light leading-relaxed text-left max-w-2xl mx-auto">
          <p>
            Maison ÉPURE was founded upon a clear principle: returning to uncompromising purity. In a world of fleeting micro-trends, we curate permanent wardrobe anchors sculpted from genuine natural fibers.
          </p>
          <p>
            Each piece begins in historic family-owned mills in Biella, Italy, and the Scottish Highlands. The fibers are hand-selected, spun into dense double-faced cashmeres and combed virgin wools, then assembled by master artisans.
          </p>
        </div>
      </div>

      {/* 3 Pillars of Distinction */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#ede5db] p-8 rounded-sm">
            <span className="text-2xl text-[#8b7355] block mb-4">01</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#1a1a1a] mb-3">
              100% Pure Noble Fibers
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              We exclusively work with 4-ply Mongolian cashmere, superfine merino wool, and raw untanned linen, completely free of synthetic blends.
            </p>
          </div>

          <div className="bg-[#ede5db] p-8 rounded-sm">
            <span className="text-2xl text-[#8b7355] block mb-4">02</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#1a1a1a] mb-3">
              Architectural Silhouette
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Tailored shoulders, unstructured ease, and fluid proportions calibrated to move naturally with the body through day and evening.
            </p>
          </div>

          <div className="bg-[#ede5db] p-8 rounded-sm">
            <span className="text-2xl text-[#8b7355] block mb-4">03</span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#1a1a1a] mb-3">
              Numbered Editions
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Crafted in micro-batches of fewer than 50 pieces per reference to eliminate excess inventory and maintain uncompromised finishing quality.
            </p>
          </div>
        </div>
      </div>

      {/* Large Visual Feature */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#f5f0eb] p-8 md:p-12 rounded-sm">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8b7355] block mb-2">
              Private Showrooms
            </span>
            <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-light text-[#1a1a1a] mb-4">
              By Private Appointment
            </h3>
            <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed mb-6">
              Experience the touch of raw cashmere and bespoke fitting sessions in our private Madison Avenue salon or our Paris atelier.
            </p>
            <div className="space-y-1 text-xs text-[#1a1a1a] mb-6">
              <p>📍 740 Madison Avenue, New York, NY</p>
              <p>📍 28 Rue du Faubourg Saint-Honoré, Paris</p>
            </div>
            <Link
              to="/"
              className="inline-block bg-[#1a1a1a] text-white px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-gray-800 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
          <div className="aspect-[4/5] bg-gray-200 rounded-sm overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1000&fit=crop"
              alt="Tailoring atelier"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
