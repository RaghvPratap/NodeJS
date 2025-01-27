// var other=function()
// {
//     return 100;
// }
// module.exports=other;
// var http=require('http');
// var data=[
//     { name:"Raghv",age:"21",email:"abc@xyz"},
//     { name:"Deep",age:"22",email:"cba@xyz"}
// ]
// http.createServer(function(req,res){
//  res.writeHead(200,{'Content-Type': 'application\json'})
//   res.write(JSON.stringify(data))
//   res.end()
// }).listen(8080);
// var events=require("events");
// const { watch } = require("fs");
// var eventEmitter=new events.EventEmitter();

// eventEmitter.on("watch",function(name){
//   console.log(name,"is speaking")
// })

// eventEmitter.emit("watch","Peter")
// var request = require('request');
// const express=require('express')
// const app=express()
// // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       console.log(data);
//     }
// });

// app.listen(3000,()=>{
//   console.log("server is running")
// })



// const fs=require("fs")
// const writeStream =fs.createWriteStream('eg.txt')
// writeStream.on('data',(chunk)=>{
//   writeStream.write("data is written")
// })


const express = require('express')
const connectDB = require('./config/database')
const app = express()
const User = require('./models/user')
const {validate}=require('./utils/validation')
const bcrypt=require('bcrypt')
app.use(express.json());


app.post('/signup', async (req, res) => {
  console.log(req.body);//this is used to send data directly from postman

  // const userObj={
    //   firstName:'raghv',
    //   lastName:'pratap',
    //   emailID:'raghvpratap5@gmail.com',
    //   password:'raghv@pratap',
    //   age:22,
    //   gender:'male'
    // }
    
    //creating a new insatnce of user model
    // const user=new User(userObj);
    
    //method 2  (directly pass the user data in the insatnce)
    // const user=new User({
      //   firstName:'raghv',
      //   lastName:'pratap',
      //   emailID:'raghvpratap5@gmail.com',
      //   password:'raghv@pratap',
      //   age:22,
      //   gender:'male'
      // });
      
    try {
    validate(req)
    const {firstName,lastName,emailID,password}=req.body;

    const pswdHash=await bcrypt.hash(password,10);
    
    //create a new user model with the encripted pswrd
    const user=new User({
      firstName,
      lastName,
      emailID,
      password:pswdHash
    });
    await user.save();
    res.send("User added successfully")
  } catch (error) {
    res.status(400).send("error while saving user")
  }
})

//User login function
app.post('/login',async (req,res)=>{
  try {
    const {emailID,password}=req.body;
    const user=User.findOne({emailID:emailID})
    if(!user){
      throw new Error("There is no user emailID in DB") 
    }

    const isPswrdValid=await bcrypt.compare(password,user.password);
    if(isPswrdValid){
      res.send('login successful')
    }else{
      throw new Error("password is incorrect") 
    }
  } catch (error) {
    res.status(400).send("login failed")
  }
})
//getting user by email
app.get('/user', async (req, res) => {
  try {
    res.send(await User.find({ emailID: req.body.emailID }))
  } catch (error) {
    res.status(400).send("kuch gadbad h")
  }
})

//getting user by name
app.get('/name',async(req,res)=>{
  try{
    res.send(await User.find({name:req.body.name}))
  }catch(error){
    res.status(400).send("kuch gadbad h")
  }
})

//delete user by userID
app.delete('/delete',async(req,res)=>{
  try {
    res.send(await User.findByIdAndDelete(Id));
  } catch (error) {
    res.status(400).send('kuch gadbad h')
  }
})

connectDB().then(() => {
  console.log("Connection established")
  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  })
}).catch((err) => {
  console.error("Connection not established")
})
