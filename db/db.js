const mongoose = require("mongoose");
const { error } = require("node:console");

const mongoURL = "mongodb://127.0.0.1:27017/hotels"

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to mongoDB");
})

db.on('disconnected',()=>{
    console.log("mongoDB disConnected");
})

db.on('error',(err)=>{
    console.log("mongoDB connection error :",err);
})

module.exports = db;