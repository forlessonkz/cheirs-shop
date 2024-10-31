const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');


const app = express();
const PORT = 8009;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/newBase').then(()=> {
    console.log('Connected by MongoDB')
}).catch((e) => {
    console.log('Failed to connect to MongoDB')
});

const newBaseSchema = new mongoose.Schema({
    title: String,
    discount: Number,
    price: Number,
    images: String,
});

const newBase = mongoose.model('newBase', newBaseSchema);

app.post('/new', async(req, res) => {
    if(req.body.title.length != 0){
        await new newBase({
            title: req.body.title,
            discount: req.body.discount,
            price: req.body.price,
            images: req.body.images,
        }).save()
        res.redirect('/products')
    } else {
        res.redirect('/new?error=1')
    }
})


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/products', async (req, res) => {
    const data = await newBase.find()
    console.log(data)
    res.render('products', {data})
})
app.get('/new', (req, res) => {
    res.render('addProduct')
})

app.get('/edit/:id', async (req, res) => {
    const newBaseData = await newBase.findById(req.params.id)
    console.log(newBaseData)
    res.render('editProduct', {data: newBaseData})
});

app.post('/edit', async(req, res) => {
    await newBase.updateOne(
        {
            _id: req.body.id
        },
        {
            title: req.body.title,
            discount: req.body.discount,
            price: req.body.price,
            images: req.body.images,
        }
    )
    res.redirect('/products')
})

app.get('/productPage', (req, res) => {
    res.render('productPage')
})

app.get('/error', (req, res) => {
    res.render('error')
})

app.listen(PORT, () => {
    console.log(`Servet listening on PORT: ${PORT}`)
})