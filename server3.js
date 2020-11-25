const express=require('express')
const sqlite3=require('sqlite3').verbose();
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
let db = new sqlite3.Database('./db/database.db')
app = new express();
app.use((req, res, next)=>{
    res.header({"Content-Type":"application/json; charset=UTF-8"})
    next()
})
app.get('/students', (req, res)=>{
    db.all("SELECT * FROM Students", (err, rows)=>{
        res.status(200).send(JSON.stringify(rows))
    })
})
app.get('/student/:sid', (req, res)=>{
    db.get("SELECT * FROM Students WHERE sid=?",[req.params.sid], (err, row)=>{
        if (!row) res.status(404).header({"Content-Type":"text/html; charset=UTF-8"}).send('Student ID not found!')
        else res.status(200).send(JSON.stringify(row))
    })
})
app.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`);
})
