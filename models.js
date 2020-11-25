const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db/database.db'
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

module.exports = {sequelize, Students, Courses, Enrollment}