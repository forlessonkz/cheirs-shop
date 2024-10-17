const express = require('express');
const ejs = require('ejs');
const path = require('path')


const app = express();
const PORT = 8009;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/products', (req, res) => {
    res.render('products')
})
app.get('/new', (req, res) => {
    res.render('addProduct')
})

app.get('/edit', (req, res) => {
    res.render('editProduct')
})


app.listen(PORT, () => {
    console.log(`Servet listening on PORT: ${PORT}`)
})