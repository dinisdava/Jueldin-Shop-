import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await axios.get(`${apiUrl}/api/cart`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCart(data);
        }
      } catch (error) {
        console.error('Erro ao buscar carrinho:', error);
      }
    };
    
    fetchCart();
  }, [apiUrl]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirecionar para login se não estiver autenticado
        window.location.href = '/login';
        return;
      }
      
      await axios.post(`${apiUrl}/api/cart`, 
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      const { data } = await axios.get(`${apiUrl}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart(data);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
