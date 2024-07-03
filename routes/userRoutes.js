const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController.js');

router.post('/processPrice', resultController.calculateAndSendResult);


module.exports = router;
