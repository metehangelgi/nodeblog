const mongoose = require('mongoose')



const Post = require('./models/post')

mongoose.connect('mongodb+srv://mgelgi17:1234567899@cluster0.ackgl.mongodb.net/nodeblog_test_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

Post.create({
    title: 'Benim ilk post başlığı',
    content: 'Post içeriği, lorem ipsum text'
}, (error,post)=> {
    console.log(error,post)
})