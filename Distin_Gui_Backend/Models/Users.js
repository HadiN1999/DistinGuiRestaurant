const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
      },
    password:{
        type: String
    } ,
    role:{
        type: Number, // role: 0 = User , 1 = admin
    } 
},
{timestamps:true}
)



module.exports = mongoose.model('User', userSchema)
