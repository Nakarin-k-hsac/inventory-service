const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/product_management')
    .then(() => console.log('Connected'))
    .catch(err => console.error('Error:', err));

app.get('/', (req, res) => {
    res.json({
        message: '🚀 Backend is running!',
        status: 'OK'
    });
});

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});