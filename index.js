const { response } = require('express');
require('dotenv').config()
const express = require('express');
const { dbConnection }=require('./DB/config')

//server

const app = express();
//connection
dbConnection()
//public directory

app.use(express.static('public'))

//read and parse of body
app.use(express.json());

app.use('/api/auth',require('./routes/auth'))


app.listen(process.env.PORT,()=> {

    console.log(`server run in port ${ process.env.PORT }`)
})