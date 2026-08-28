const express = require("express");

const PersonRoute = express.Router();

const person = require('./../models/person.js');

PersonRoute.post("/",async (req,res)=>{
    try{

        //request body contains the data which user has sent or post data to the backend for db.....
        const data = req.body;

        //create a new person document using mongodb model person
        const newPerson = new person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log("response data saved");
        res.status(201).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
});

PersonRoute.get("/",async (req,res)=>{
    try{  
        const fetch = await person.find();

        console.log("data fetched");

        res.status(201).json(fetch);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
})

PersonRoute.get("/:workRole",async (req,res)=>{
    try{
        const workRole = req.params.workRole;
        if(workRole=="chef" || workRole=="waiter" || workRole=="manager")
        {
            const response = await person.find({work : workRole});
            console.log("here is the list");
            res.status(200).json(response);
        }
        else{
            console.log("invalid");
            res.status(400).json({error : "Invalid role"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
});

PersonRoute.put("/:_id",async (req,res)=>{
    try{
        const user = req.params._id;
        const updateWithThis = req.body;
        const response = await person.findOneAndUpdate({ _id: user },updateWithThis,
            { new: true });
        if(!response)
        {
            console.log("No Id");
            res.status(404).json({error : "Invalid"});
        }
        console.log("updated");
        res.status(200).json(response);
    }
    catch(err){
        // console.log(err);
        res.status(500).json({error : "Internal server error"});
    }
});

module.exports = PersonRoute;