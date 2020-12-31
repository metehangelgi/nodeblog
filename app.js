const path = require('path')
const express = require('express')
const app = express()
const port = 3000
const hostName = '127.0.0.1'


app.use(express.static('public'))


app.listen(port,hostName, () => {
    console.log(`Server çalışıyor, http://${hostName}:${port}/`)
})

