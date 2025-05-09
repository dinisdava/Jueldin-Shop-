import axios from 'axios';
import { useState } from 'react';

export default function MpesaButton({ amount }) {
  const [phone, setPhone] = useState('');

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('/api/mpesa/pay', { phone, amount });
      alert('Pagamento iniciado! Confirme no seu celular');
    } catch (error) {
      alert('Erro: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="tel"
        placeholder="879903962"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border rounded"
      />
      <button 
        onClick={handlePayment}
        className="bg-green-600 text-white p-2 ml-2 rounded"
      >
        Pagar com M-Pesa
      </button>
    </div>
  );
}
