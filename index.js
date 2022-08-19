const { response } = require('express');
require('dotenv').config()
const express = require('express');
const { dbConnection }=require('./DB/config')
const cors = require('cors')
//server

const app = express();
//connection
dbConnection()
//cors
app.use(cors())

//public directory

app.use(express.static('public'))

//read and parse of body
app.use(express.json());

app.use('/api/auth',require('./routes/auth'))


app.listen(process.env.PORT,()=> {

    console.log(`server run in port ${ process.env.PORT }`)
})