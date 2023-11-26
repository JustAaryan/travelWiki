const express = require('express');
const app = express()
const axios = require('axios');



module.exports.home = function (req,res){
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/posts'
    //   })
    //     .then(function (response) {
    //       console.log(response.data);
    //       return res.render('index',{res_data:response.data});
    //     });
    // return ;

    res.render('wiki');
}

