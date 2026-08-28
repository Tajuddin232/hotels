const express = require("express");

const MenuRoute = express.Router();

const menuItem = require('./../models/Menu.js');

MenuRoute.post("/",async (req,res)=>{
        try{
            const data = req.body;

            const newItem = new menuItem(data);

            const response = await newItem.save();

            console.log("Item is added to the menu db");

            res.status(201).json(response);
        }
        catch(err){
            console.log(err);
            res.status(500).json({"error " : "Invalid Item"});
        }
});

MenuRoute.get("/",async (req,res)=>{
    try{
        const item = await menuItem.find();

        console.log("MENU");

        res.status(200).json(item);
    }
    catch(err){
            console.log(err);
            res.status(500).json({"error " : "Fetching failed"});
        }
});

MenuRoute.get("/:tasteType",async (req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType=="sweet" || tasteType== "spicy" || tasteType=="sour")
        {
            const response =await menuItem.find({taste : tasteType});
            console.log("found the list of : ",req.params.tasteType);
            res.status(201).json(response);
        }
        else{
            console.log("invalid Item");
            res.status(400).json({error : "Invalid Item"});
        }
    }
    catch(err){
            console.log(err);
            res.status(500).json({"error " : "Fetching failed"});
        }
});

module.exports = MenuRoute;