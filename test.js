const mongoose = require('mongoose')



const Post = require('./models/post')

mongoose.connect('mongodb+srv://mgelgi17:1234567899@cluster0.ackgl.mongodb.net/nodeblog_test_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})


Post.create({
    title: 'ikinci post başlığı',
    content: 'ikinci post içeriği, lorem ipsum text'
}, (error,post)=> {
    console.log(error,post)
})


/* Post.findById('5feded2c21d41e26a68d3927', (error,post) =>{
    console.log(error,post)
}) */

/* Post.find({ }, (error,post) =>{
    console.log(error,post)
}) */

/* Post.findByIdAndUpdate('5feded2c21d41e26a68d3927', { //değişen başlığı döndürüyor 
    title : 'Benim initial postum'
}, (error,post) =>{
    console.log(error,post)
}) */

/* Post.findByIdAndDelete('5fedf0bd141868276f331c67', (error,post)=>{
    console.log(error,post)
}) */
