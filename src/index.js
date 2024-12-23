const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose
    .connect(config.mongoUri) // Removed outdated options
    .then(() => console.log('DevKart server is conected'))
    .catch(err => console.error('Database connection error:', err));

const PORT = config.port || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
