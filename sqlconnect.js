var mysql=require('mysql')
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'summer'
})
con.connect(function(error){
    if(error) throw error;
   con.query("select * from book",function(error,result){
    if(error) throw error;
    console.log("all results are here",result)
   })
      
})

// Tz2w4LaDh5IKpmqM
// mongodb+srv://<db_username>:<db_password>@cluster0.6dbfk.mongodb.net/