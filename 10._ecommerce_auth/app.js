const express = require('express');

const authRoute = require('./routes/authRoute');

const app = express();
app.use(express.json());

require('dotenv').config();

app.use('/api', authRoute)

app.listen(process.env.PORT, () => console.log('Server Running On Port ' + process.env.PORT));