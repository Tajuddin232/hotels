const mongoose = require("mongoose");
const { type } = require("node:os");

const modelSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        age:{
            type:Number
        },
        work:{
            type:String,
            enum:['chef','waiter','manager'],
            required:true
        },
        mobile:{
            type:String,
            required : true
        },
        email:{
            type:String,
            required:true,
            unique : true
        },
        address:{
            type:String,
            required:true
        },
        salary:{
            type:Number,
            required:true
        }
    }
);

const person = mongoose.model('person',modelSchema);
module.exports = person;