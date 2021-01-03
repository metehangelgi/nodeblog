const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Post = require('../../models/post')
const path = require('path')

router.get('/', (req,res) => {
    res.render('admin/index')
})

router.get('/categories', (req,res) => {
    Category.find({}).sort({$natural:-1}).lean().then(categories => {
        res.render('admin/categories', {categories:categories})
    })
})

router.post('/categories', (req,res) => {
    Category.create(req.body, (error, category) => {
        if(!error){
            res.redirect('categories')
        }
    })
})

router.delete('/categories/:id', (req,res) => {
    Category.deleteOne({_id : req.params.id}).lean().then(() => {
        res.redirect('/admin/categories')
    })
})


router.get('/posts', (req,res) => {
    Post.find({}).populate({path: 'category', model: Category}).sort({$natural:-1}).lean().then(posts => {
            res.render('admin/posts',{posts:posts})
        })
})

router.delete('/posts/:id', (req,res) => {
    Post.deleteOne({_id : req.params.id}).lean().then(() => {
        res.redirect('/admin/posts')
    })
})

router.get('/posts/edit/:id', (req,res) => {
    Post.findOne({_id: req.params.id}).lean().then(post => {
        Category.find({}).lean().then(categories => {
            res.render('admin/editpost',{post:post,categories:categories})
        })
    })
})

router.put('/posts/:id', (req,res) => {
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../../public/img/postimages',post_image.name))

    Post.findByIdAndUpdate({_id: req.params.id}, {
        title : req.body.title,
        content : req.body.content,
        date : req.body.date,
        category : req.body.category,
        post_image : `/img/postimages/${post_image.name}`
    }, () => {
        res.redirect('/admin/posts')
    })

})

module.exports = router