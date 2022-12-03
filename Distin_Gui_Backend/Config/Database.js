const mongoose = require('mongoose');

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then(con =>{
        console.log(`MongDB database connected with HOST: ${con.connection.host}`)

    })

}

module.exports=connectDatabase
