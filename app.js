const path = require('path')
const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const hostName = '127.0.0.1'

await mongoose.connect('mongodb+srv://mgelgi17:1234567899@cluster0.ackgl.mongodb.net/nodeblog_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})



app.use(express.static('public'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    res.render('site/index')
})

app.get('/about', (req,res) => {
    res.render('site/about')
})

app.get('/blog', (req,res) => {
    res.render('site/blog')
})

app.get('/contact', (req,res) => {
    res.render('site/contact')
})

app.get('/login', (req,res) => {
    res.render('site/login')
})

app.get('/register', (req,res) => {
    res.render('site/register')
})

app.listen(port,hostName, () => {
    console.log(`Server çalışıyor, http://${hostName}:${port}/`)
})

