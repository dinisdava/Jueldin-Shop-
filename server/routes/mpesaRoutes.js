const express = require('express');
const { lipaNaMpesa, mpesaCallback } = require('../controllers/mpesaController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/pay', protect, lipaNaMpesa);
router.post('/callback', mpesaCallback);

module.exports = router;
