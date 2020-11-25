const express = require('express')
const port = 3000
const app = express()
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
app.use('/', router)
app.listen(port, ()=>{
    console.log('server listen at ', port)
})