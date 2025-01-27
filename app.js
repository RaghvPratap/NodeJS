// const express=require('express')
// const app=express();

// const checkUrl=function(req,res,next){
//     console.log("current url is:",req.originalUrl)
//     next();
// }
// // app.use(checkUrl)

// app.get('/',function(req,res){
//     // res.send("this is the home page")
//     res.sendFile(__dirname+"/home.html")
// })
// app.get('/about',function(req,res){
//     // res.send("this is the about page")
//     res.sendFile(__dirname+"/about.html")
// })
// app.get('/login',function(req,res){
//     res.send("this is the login page")
// }).listen(8080)


// const express=require("express");
// const app=express()
// app.set('view engine','ejs')
// app.get("/profile",function(req,res){
//     const user={
//         name:'peter',
//         country:'usa'
//     }
//     const data={skills:['node js','java','sql']}
//    res.render('profile',{user,data})
// })

// app.listen(8080)



const express=require("express");
const app=express()
const mongoose=require("mongoose")
const user=require('./models/users')
var bodyParser=require('body-parser')
var jsonParser=bodyParser.json()
mongoose.connect('mongodb+srv://raghv:639336@cluster0.6dbfk.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0',
    {
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    }
).then(()=>{
    console.log("db connection done")
})

//Get data from mongodb database

app.get('/users',function(req,res){
    user.find().then((data)=>{
        res.json(data)
        // console.log(data)
    })
})

//post data to mongodb database
const  {ObjectId}= require('mongodb'); // Import ObjectId directly from mongodb

app.post('/user', jsonParser, function(req, res) {
    const data = new user({
        _id: new ObjectId(), // Using ObjectId from mongodb
        name: req.body.name,
        email: req.body.email
    });

    data.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            console.warn(error);
           
        });
});

//Delete data from api

app.delete('/user/:id',function(req,res){
    user.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json(result)
    }).catch((error)=>{
        console.warn(error)
    })
})

app.put('/user/:id',jsonParser,function(req,res){
    user.updateOne({_id:req.params.id},
                   {$set:{name:req.body.name}}).then((result)=>{
                    res.status(201).json(result)
                   }).catch((error)=>{
                    console.warn(error)
                   })
})


app.get('/search/:name',function(req,res){
    var regex=new RegExp(req.params.name,'i')
    user.find({name:regex}).then((result)=>{
        res.status(200).json(result)
    })
})
app.listen(4000)
//Add new user to mongodb database

// const data=new user({
//     _id:new mongoose.Types.ObjectId(),
//     name:'tony',
//     email:'xyz@abc'

// })
// data.save().then((result)=>{
//     console.log(result)
// })
// .catch(err=>console.error()
// )