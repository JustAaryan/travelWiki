const express = require('express');
const router = express.Router();

const home = require('../controllers/HomeCont');


console.log('router loaded');
router.get('/', home.home);


module.exports = router;