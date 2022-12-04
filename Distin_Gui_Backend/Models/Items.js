const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category' 
    },
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
},
{timestamps:true}
)



module.exports = mongoose.model('Items', itemsSchema)
