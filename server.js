const express = require('express')
const port = 3000
const app = express()
const router = require('./router.js')


app.use('/', router)
app.listen(port, ()=>{
    console.log('server listen at ', port)
})