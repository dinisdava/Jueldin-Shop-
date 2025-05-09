const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const lipaNaMpesa = async (req, res) => {
  const { phone, amount } = req.body;
  // Adicionar definição da variável timestamp
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14);
  
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');

  try {
    // 1. Obter token de acesso
    const { data: { access_token } } = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );

    // 2. Iniciar pagamento
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: '174379',
        Password: Buffer.from(`174379${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64'),
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: '174379',
        PhoneNumber: phone,
        CallBackURL: `${process.env.API_URL}/api/mpesa/callback`,
        AccountReference: 'JueldinShop',
        TransactionDesc: 'Compra na Jueldin'
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error('M-Pesa error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Erro ao processar pagamento M-Pesa', 
      error: error.response?.data || error.message 
    });
  }
};

// Adicionar função de callback
const mpesaCallback = async (req, res) => {
  try {
    const { Body } = req.body;
    
    if (Body.stkCallback.ResultCode === 0) {
      // Pagamento bem-sucedido
      // Implemente a lógica para atualizar o pedido
      console.log('Pagamento M-Pesa bem-sucedido:', Body);
    } else {
      // Pagamento falhou
      console.log('Pagamento M-Pesa falhou:', Body);
    }
    
    res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
};

module.exports = { lipaNaMpesa, mpesaCallback };
