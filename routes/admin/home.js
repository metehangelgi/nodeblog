const express = require('express')
const router = express.Router()

router.get('/admin', (req,res) => {
    res.redirect('/index')
})

module.exports = router