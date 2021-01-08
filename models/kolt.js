const mongoose = require('mongoose')

const KoltSchema = new mongoose.Schema({
    name:{type: String, required:true,unique:true}
})


module.exports = mongoose.model('Kolt',KoltSchema)