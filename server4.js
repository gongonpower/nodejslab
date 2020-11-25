const express=require('express')

const PORT = process.env.PORT || 3000
const HOSt = process.env.HOST || 'localhost'

// database interface components

const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.db'
})

sequelize.authenticate() // check for connection
    .then(()=>{
        console.log('Connection has been established successfully.')})
    .catch (error=>console.error('Unable to connect to the database:', error))

const Students = sequelize.define('Students', {
    sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            is: /[A-Z]{2}-[0-9]{3}/
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {timestamps:false})
const Courses = sequelize.define('Courses', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps:false})
const Enrollment = sequelize.define('Enrollment', {
    sid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gradepoint: {
        type: DataTypes.REAL,
        allowNull: false
    }
}, {timestamps:false})

app = express();
app.use((req, res, next)=>{
    res.header({
        "Content-Type":"application/json; charset=UTF-8",
        "Access-Control-Allow-Origin":"*"
    })
    next()
})
app.get ('/students', (req, res)=>{
    Students.findAll()
        .then((rows)=>{
            res.send(JSON.stringify(rows))
        })
        .catch((err)=>{
            console.log(err);
            res.status(500)
        })
})
app.get ('/student/:sid', (req, res)=>{
    Students.findByPk(req.params.sid)
        .then((row)=>{res.send(JSON.stringify(row))})
        .catch(error=>{console.log(error)})
})
app.get ('/courses', (req, res)=>{
    Courses.findAll()
        .then((rows)=>{
            res.send(JSON.stringify(rows))
        })
        .catch((err)=>{
            console.log(err);
            res.status(500)
        })
})
app.get ('/course/:code', (req, res)=>{
    Courses.findByPk(req.params.code)
        .then((row)=>{res.send(JSON.stringify(row))})
        .catch(error=>{console.log(error)})
})

app.listen(PORT, ()=>{
    console.log (`The app is running at port: ${PORT}...`)
})
