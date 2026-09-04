import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { menuData } from '../data/menuData';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const item = menuData.find((p) => p.id === parseInt(id));

  if (!item) {
    return (
      <div className="text-center py-20 text-2xl text-[#4A2511]">
        Product Not Found!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <Link to="/menu" className="text-[#FF8C32] font-bold mb-6 inline-block hover:underline">
        ← Back to Menu
      </Link>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-[#4A2511]/10">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover max-h-[350px]" />
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#4A2511]">{item.name}</h1>
            <p className="text-gray-600 mt-4 leading-relaxed">{item.description}</p>
          </div>
          <div className="mt-8">
            <span className="text-3xl font-black text-[#FF8C32] block mb-4">
              ${item.price.toFixed(2)}
            </span>
            <button
              onClick={() => addToCart(item)}
              className="bg-[#FF8C32] hover:bg-[#e07722] text-white font-bold w-full py-3 rounded-xl shadow-lg transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}