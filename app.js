//const path = require('path')
const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express()
const port = 3000
const hostName = '127.0.0.1'

mongoose.connect('mongodb+srv://mgelgi17:1234567899@cluster0.ackgl.mongodb.net/nodeblog_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(fileUpload())

app.use(express.static('public'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const myMiddleware = (req,res,next) =>{
  console.log('benim adım metehan')
  next()
}

app.use('/',myMiddleware)

const main = require('./routes/main')
app.use('/',main)

const posts = require('./routes/posts')
app.use('/posts',posts)

app.listen(port,hostName, () => {
    console.log(`Server çalışıyor, http://${hostName}:${port}/`)
})

