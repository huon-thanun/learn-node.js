const express = require('express');
const cors = require('cors')

const productRoute = require('./routes/productRoutes');
const categoriesRoute = require('./routes/categoriesRoutes')

const app = express();
app.use(cors());
app.use(express.json())

// app.get('/', (req, res) => {
//     const rows = pool.query('select *from producs' (err, data) => )
// });

//=============products==============//
app.use(productRoute);
// ============================//

//==============categories=================//
app.use(categoriesRoute);
// ============================//

app.listen(3000, () => console.log('Server running on port 3000'))