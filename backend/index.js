const express = require('express');
const port = process.env.PORT||7070;

const app = express();
var path=require('path');

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(path.join(__dirname,'public')));

//use separate express router
app.use('/',require('./routes'));



app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Successfully running on port :", port);
    }
})

