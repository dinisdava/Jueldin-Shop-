import { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Image 
        src={product.image} 
        alt={product.name}
        width={300}
        height={300}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-lg">{product.price} MZN</p>
        <button 
          onClick={() => addToCart(product._id)}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
