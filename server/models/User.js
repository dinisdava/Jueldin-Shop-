const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, informe seu nome']
  },
  email: {
    type: String,
    required: [true, 'Por favor, informe seu email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, forneça um email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'Por favor, informe uma senha'],
    minlength: 6
  },
  phone: {
    type: String
  },
  address: {
    street: String,
    city: String,
    province: String,
    zipCode: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
