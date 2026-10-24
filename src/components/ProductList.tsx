import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

const ProductList: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {products.map((product) => (
      <Link
        key={product.id}
        to={`/product/${product.id}`}
        className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-[#b8860b] text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 font-['Playfair_Display'] mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-[#b8860b]">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-[#b8860b] transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default ProductList;
