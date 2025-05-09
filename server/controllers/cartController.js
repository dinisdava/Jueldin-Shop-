const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Adicionar item ao carrinho
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Verificar se o produto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verificar se há estoque suficiente
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Estoque insuficiente' });
    }

    // Procurar carrinho existente ou criar novo
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        total: 0
      });
    }

    // Verificar se o produto já está no carrinho
    const itemIndex = cart.items.findIndex(item => 
      item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Atualizar quantidade se o produto já está no carrinho
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Adicionar novo item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    // Calcular total
    cart.total = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Salvar carrinho
    await cart.save();

    // Popula os detalhes do produto antes de retornar
    await cart.populate('items.product');
    
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Obter carrinho do usuário
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Encontrar carrinho e popular dados do produto
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      return res.json({ items: [], total: 0 });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = { addToCart, getCart };
