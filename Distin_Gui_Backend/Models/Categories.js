const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
      },
    items:[{
        name: {
        type: String,
      },
      description:{
        type:String
      },
      price:{
        type:Number
      },
      image:{
        type:String
      }
    }]  
},
{timestamps:true}
)



module.exports = mongoose.model('Category', categorySchema)
