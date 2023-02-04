const express = require("express")
const route= require ("./route/route")
const mongoose =require('mongoose')

const app = express()

app.use(express.json());
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Raunak22012001:8329059512%40Ujwal@cluster0.tagnbhk.mongodb.net/Assignment_db",{
    useNewUrlParser:true
})
.then(()=> console.log("MongoDB is connected"))
.catch((error)=>console.log(error))

app.use('/', route)

app.listen(3000 , function (){
    console.log("Express app is running on port :"+3000)
})