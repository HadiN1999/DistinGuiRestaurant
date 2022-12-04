const mongoose = require('mongoose');
const { number } = require('yup');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
      },
    image:{
        type: String,
    }  ,
    position:{
        type:Number
    },
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }]  
},
{timestamps:true}
)



module.exports = mongoose.model('Category', categorySchema)
