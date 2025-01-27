const mongoose=require('mongoose')
//Method 1
const connectDB=async()=>{
    await mongoose.connect(
          'mongodb+srv://raghv:639336@cluster0.6dbfk.mongodb.net/DB1',
              {
                  // useNewUrlParser:true,
                  // useUnifiedTopology:true
              }
          )
    
}
  module.exports=connectDB;
  


//Method 2

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       'mongodb+srv://raghv:639336@cluster0.6dbfk.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0'
//     );
//     console.log("Connection established");
//   } catch (err) {
//     console.error("Connection not established", err);
//   }
// };

// // Call the function to connect
// connectDB();
