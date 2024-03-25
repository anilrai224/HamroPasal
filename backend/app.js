const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const connect = require('./config/dbConnect');
const validateUser =require('./middleware/authToken');
const dotenv = require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.static('uploads'))
app.use(bodyParser.json());

connect();

app.use('/api/user', authRoutes);
app.use('/product', productRoutes);
app.use('/api/cart',validateUser,cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
