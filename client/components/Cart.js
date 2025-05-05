import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="fixed right-4 top-16 bg-white p-4 shadow-lg rounded-lg">
      <h3 className="font-bold text-lg">Seu Carrinho</h3>
      {cart.items?.map(item => (
        <div key={item._id} className="flex justify-between py-2">
          <span>{item.product.name}</span>
          <span>{item.quantity} x {item.product.price} MZN</span>
        </div>
      ))}
      <div className="font-bold border-t pt-2">
        Total: {cart.total} MZN
      </div>
    </div>
  );
}
