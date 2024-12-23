const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userCtrl = require('../controllers/userController');
const router = express.Router();

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;