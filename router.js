
const express = require('express')
const router = express.Router()

router.use('/', (req, res, next)=>{
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
})

router.get('/about', (req, res)=> {
    res.send('what do you want to know about me? ...')
})
router.get('/', (req, res)=> {
    res.status(200).send('you are at root');
})