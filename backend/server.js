const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const Item = mongoose.model('Item', { name: String });

app.get('/api/items', async (req, res) => res.json(await Item.find()));
app.post('/api/items', async (req, res) =>
    res.json(await Item.create({ name: req.body.name })));

app.listen(5000, () => console.log('Backend on 5000'));