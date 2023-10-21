// import express from 'express';
// import dotenv from "dotenv";
// import connect from './src/config/DataBaseConnection.js';
// import cors from 'cors';
// import passport from 'passport';

// import { passportLocalSetup } from "./passport.js";
// import expressSession from "express-session";

// // Importing Routes
// import Email from './src/routes/EmailVerification.js';
// import Contractors from './src/routes/Contractor_Routes.js';
const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/config/DataBaseConnection.js");
const cors = require("cors");
const passport = require("passport");

const { passportLocalSetup } = require("./passport.js");
const expressSession = require("express-session");

// Importing Routes
const Email = require("./src/routes/EmailVerification.js");
const Contractors = require("./src/routes/Contractor_Routes.js");

const port = process.env.PORT || 5000;
const app = express();
dotenv.config();

// To parse json data
app.use(express.json());

// Passport Setup
passportLocalSetup();

// Express Session
app.use(
  expressSession({
    secret: "somethingsecretgoeshereverylong",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false }, // set to true when secured connection
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// To avoid cors error
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Web3
const ABI = require("./ABI.json");
const { Web3 } = require("web3");
const web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/ks2UXGvvtc2BEiJ5RUzKmKgcBUCCldJJ"
);
const contractAddress = "0x88B238271e8B6f0AB102F65f2A767996B1D38C84";
const contract = new web3.eth.Contract(ABI, contractAddress);

app.post("/createTender", async (req, res) => {
  try {
    const {
      name,
      contractTitle,
      description,
      startDate,
      endDate,
      tenderNumber,
    } = req.body;

    const tender = await contract.methods
      .createTender(
        name,
        contractTitle,
        description,
        startDate,
        endDate,
        tenderNumber
      )
      .call();

    res.status(200).json({ status: 200, message: "Tender Created" });
  } catch (error) {
    res.status(404).json({ status: 500 });
    console.error(error);
  }
});

app.get("/viewAllTenders", async (req, res) => {
  try {
    const viewAllTenders = await contract.methods.getAllTenders().call();

    res.status(200).json({ status: 200, viewAllTenders });
  } catch (error) {
    res.status(404).json({ status: 500 });
    console.error(error);
  }
});

// Connection to the database
const database_url = process.env.DATABASE;
connect(database_url);

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define a route for the root URL
app.use("/email", Email);
app.use("/contractor", Contractors);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*

//0x714225eF1F1575D0Ed17B108869413E38656B475
//https://eth-sepolia.g.alchemy.com/v2/ks2UXGvvtc2BEiJ5RUzKmKgcBUCCldJJ
const express = require('express')
const ABI = require("./ABI.json");
const {Web3}= require("web3");
const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/ks2UXGvvtc2BEiJ5RUzKmKgcBUCCldJJ")
const contractAddress = "0x714225eF1F1575D0Ed17B108869413E38656B475";
const contract = new web3.eth.Contract(ABI,contractAddress);
//console.log(contract);

const app = express();

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server Running At PORT ${PORT}`)
})


const TenderCount = async ()=>{
    const tcount = await contract.methods.getTenderCount().call();
    console.log("count: ",tcount);
}

TenderCount();



app.get("/tendertrust/ethereum/tendercount",async(req,res)=>{
        try{
            
            const tcount = await contract.methods.getTenderCount().call();
            const num = tcount;
            //console.log("count: ",tcount);
            
             const count = Number(num);
            // const taskObj={
            //     numId,name,date
            // }
            res.status(200).json({status:200,"No of tenders: ":count})
        }catch(error){
            res.status(404).json({status:500})
            console.error(error)
        }
    })
    



  */
