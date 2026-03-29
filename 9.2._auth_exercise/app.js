const express = require('express');

const authRoute = require('./routes/authRoute');

const app = express();
app.use(express.json());

app.use(authRoute);

app.listen(3000, () => console.log('Server Running On Port 3000'));