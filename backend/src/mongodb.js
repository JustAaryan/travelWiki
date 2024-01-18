const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Login")

.then(()=>{

    console.log("mongodb connected");
})
.catch(()=>{
    console.log("Failed To Connect");
})

const Loginschema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }

})
const collection=new mongoose.model("Logininfo",Loginschema)

module.exports=collection