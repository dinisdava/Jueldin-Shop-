const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const lipaNaMpesa = async (req, res) => {
  const { phone, amount } = req.body;
  
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');

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
      Timestamp: new Date().toISOString().replace(/[-:.]/g, ''),
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: '174379',
      PhoneNumber: phone,
      CallBackURL: 'https://seusite.com/api/mpesa-callback',
      AccountReference: 'JueldinShop',
      TransactionDesc: 'Compra na Jueldin'
    },
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  res.json(response.data);
};

module.exports = { lipaNaMpesa };
