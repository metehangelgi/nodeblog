const path = require('path')
const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = 3000
const hostName = '127.0.0.1'


app.use(express.static('public'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'site/index.html'))
})

app.get('/about', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'site/about.html'))
})

app.get('/blog', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'site/blog.html'))
})




app.listen(port,hostName, () => {
    console.log(`Server çalışıyor, http://${hostName}:${port}/`)
})

