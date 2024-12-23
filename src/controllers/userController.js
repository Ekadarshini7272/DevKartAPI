const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { responseMsg} = require('../common/responseHelper')

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, gmail,age, username, password, contactNumber, gender } = req.body;
    try {
        // Check if gmail, username, or contact number already exist
        const existingUser = await User.findOne({
            $or: [
                { gmail },
                { username },
                { contactNumber }
            ]
        });

        if (existingUser) {
            const errorMessages = [];
            if (existingUser.gmail === gmail) errorMessages.push('This email is already registered.');
            if (existingUser.username === username) errorMessages.push('This username is already taken.');
            if (existingUser.contactNumber === contactNumber) errorMessages.push('This contact number is already registered.');
            return responseMsg(res, 400, false, errorMessages.join(''));
        }
        // Hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        // Create new user
        const newUser = new User({
            name,
            gmail,
            age,
            username,
            password,
            contactNumber,
            gender,
        });
        // Save user to database
        await newUser.save();
        return responseMsg(res, 201, true, 'User registered successfully.', {userId: newUser._id})
        // res.status(201).json({ message: 'User registered successfully.', newUser });
    } catch (error) {
        console.error('Register Error', error.message);
        // res.status(500).json({ message: 'Server error' });
        return responseMsg(res, 500, false, 'Server Error');
    }
};
// Login a user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return responseMsg(res, 400, false, 'Invalid username');
            // return res.status(400).json({ message: 'Invalid username' });
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return responseMsg(res, 401, false, 'Invalid password');
            // return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            config.jwtSecret, // Accessing JWT secret from config
            { expiresIn: '10h' }
        );
        return responseMsg(res, 200, true, 'Login Successful', { token });
        // res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login Error:', error.message);
        return responseMsg(res, 500, false, 'Server Error')
        // res.status(500).json({ message: 'Server error' });
    }
};
