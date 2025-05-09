require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro no MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/mpesa', require('./routes/mpesaRoutes'));

// Rota de verificação
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando corretamente' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
