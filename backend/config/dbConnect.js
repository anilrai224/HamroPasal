const mongoose = require('mongoose');
const url = 'mongodb+srv://anilrai224:Anilrai123@cluster0.ewh89om.mongodb.net/hamropasal?retryWrites=true&w=majority'

async function connect(){
    try{
      await mongoose.connect(url);
      console.log('Connected to Database');
    }catch(err){
      console.error(err)
    }
  }

module.exports = connect;