const express=require("express")
const app=express()
var path=require('path');
const hbs=require("hbs")
const collection=require("./mongodb")
const tempelatePath=path.join(__dirname,'../views')
const exphbs=require('express-handlebars');





app.engine('handlebars', exphbs.engine());
app.use(express.static(path.join(__dirname,'public')));


app.use(express.json())
//app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extend:false}))
app.get("/",(req,res)=>{

    res.render("wiki")
})
app.get("/login",(req,res)=>{

    res.render("login")
})
app.get("/signup",(req,res)=>{

    res.render("signup")
})
app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password

    }

   await collection.insertMany([data])

   res.render("blog")


})

app.post("/login",async(req,res)=>{
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

app.listen(3000,()=>{
console.log("port connected");
})