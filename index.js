const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./routes/authRoutes')
const mysql = require('mysql2/promise'); 
const productsRoute = require('./routes/productRoutes')

const loginRoute = require('./routes/authRoute')
const adminRoute = require('./routes/userRoutes')

const app = express();
const port = process.env.PORT || 9000;

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(bodyParser.json());

// app.use('/auth', loginRoutes);

app.use('/auth', loginRoute);
app.use('/admin' , adminRoute);
app.use('/products' , productsRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
