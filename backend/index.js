const express = require('express');
const port = process.env.PORT||7070;
const app=express()
var path=require('path');
//const hbs=require("hbs")
const collection=require("./src/mongodb");
const { CLIENT_RENEG_LIMIT } = require('tls');


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname,'public')));

//use separate express router
app.use('/',require('./routes'));



//app.engine('handlebars', exphbs.engine());


app.use(express.json())
//app.set("view engine","hbs")
app.set('views', './views');
app.use(express.urlencoded({extend:false}))
app.get("/",(req,res)=>{

    res.render("wiki")
})
app.get("/login.ejs",(req,res)=>{

    res.render("login")
})
app.get("/signup.ejs",(req,res)=>{

    res.render("signup")
})
app.post("/register",async(req,res)=>{
    console.log("ji")
    console.log(req.body)

    const data={
        name:req.body.name,
        password:req.body.password

    }
    //console.log("incoming data",data)
   await collection.insertMany([data])

   res.render("blog")



})

app.post("/login.ejs",async(req,res)=>{
 try{
    const check=await collection.findone({name:req.body.name})
    if(check.password===req.body.password){
        res.render("blog")
    }
    else{
        res.send("Invalid Password")
    }
 }
catch{
    res.send("Wrong Details")
}
  

})
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Successfully running on port :", port);
    }
})

// app.listen(3000,()=>{
// console.log("port connected");
// })