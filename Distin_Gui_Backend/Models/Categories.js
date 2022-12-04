const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
      },
    image:{
        type: String,
    }  ,
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }]  
},
{timestamps:true}
)



module.exports = mongoose.model('Category', categorySchema)
