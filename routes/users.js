const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/register', (req,res) => {
    res.render('site/register')
})

router.post('/register', (req,res) => {
    User.create(req.body, (error,user) => {
        req.session.sessionFlash = {
            type : 'alert alert-danger',
            message: 'Kullanıcı başarılı şekilde oluşturuldu.'
        }
        res.redirect('/users/login')
    })
})

router.get('/login', (req,res) => {
    res.render('site/login')
})

router.post('/login', (req,res) => {
    const {email,password} = req.body

    User.findOne({email},(error,user) => {
        if (user){
            if(user.password == password){
                //USER SESSION
                req.session.userId = user._id
                req.session.username = user.username
                req.session.save((err) => {
                    // session saved
                    res.redirect('/')
                  })
                //res.redirect('/')
            } else {
                res.redirect('/users/login')
            }
        } else {
            res.redirect('/users/register')
        }
    })
    
})

router.get('/logout', (req,res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
    
})

module.exports = router