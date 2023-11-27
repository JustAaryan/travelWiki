const express = require('express');
const port = process.env.PORT||7070;

const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

//use separate express router
app.use('/',require('./routes'));



app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Successfully running");
    }
})

