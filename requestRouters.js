const express=require('express');
const reqRouter=express.Router();
const {userAuth}=require("./models/users")

reqRouter.post('/connectReq',userAuth,(req,res)=>{
    const user=req.user
    console.log("Connection req sent")
    res.send(user.firstName+"Connection req ")
  })

module.exports=reqRouter;