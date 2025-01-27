// const http=require("http");

// const server=http.createServer((req,res)=>{
//     console.log('request made to browser')
// })
// server.listen(8080,'localhost',()=>{
//     console.log('server is listening on port 8080')
// })

const express=require('express')
const app=express()
const sendMail=require("./sendEmail")

app.get("/",(req,res) =>{
    res.send("I am a server")
})

app.get("/email",sendMail)
const start=async()=>{
    try {
        app.listen(5000,()=>{
            console.log("server working on port 5000")
        })
    } catch (error) {
        
    }
}

start()