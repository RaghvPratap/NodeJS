const express=require('express')
const authRouter=express.Router();
const {validate}=require('./utils/validation')
const bcrypt=require('bcrypt')
const User = require('./models/user')


authRouter.post('/signup', async (req, res) => {
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
  authRouter.post('/login',async (req,res)=>{
    try {
      const {emailID,password}=req.body;
      const user=User.findOne({emailID:emailID})
      if(!user){
        throw new Error("There is no user emailID in DB") 
      }
  
      const isPswrdValid=await bcrypt.compare(password,user.password);
      if(isPswrdValid){
        const token =await jwt.sign({ _id:user._id},"Hello@NodeJS",{expiresIn:"1d"});//cookie and token both can be expired
        console.log(token)
        res.cookie("token",token)
        res.send('login successful')
      }else{
        throw new Error("password is incorrect") 
      }
    } catch (error) {
      res.status(400).send("login failed")
    }
  })

  //user logout

  authRouter.post('/logout',async(req,res)=>{
    res
    .cookie("token",null,{
        expires:new Date(Date.now()),
    })
    .send("logout successful!!");
  })

module.exports=authRouter