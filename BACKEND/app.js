const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/config/DataBaseConnection.js");
const cors = require("cors");
const passport = require("passport");
const { passportLocalSetup } = require("./passport.js");
const Tender = require('./src/models/Tender.js');
const expressSession = require("express-session");
const { createTender } = require("./src/utils/CreateTender/CreateTender.js");

// Import your Contractor and GovOfficial models
const Contractor = require("./src/models/Contractor.js");


// Importing Routes
const Email = require("./src/routes/EmailVerification.js");
const Contractors = require("./src/routes/Contractor_Routes.js");

const port = process.env.PORT || 5000;
const app = express();
dotenv.config();

// To parse json data
app.use(express.json());

// Passport Setup
passportLocalSetup(); // Setup for Contractors

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

// Web3   https://eth-sepolia.g.alchemy.com/v2/ks2UXGvvtc2BEiJ5RUzKmKgcBUCCldJJ
const ABI = require("./ABI.json");
const { Web3 } = require("web3");
const web3 = new Web3(
  "HTTP://127.0.0.1:7545"
);


const contractAddress = "0xBf506db32180D64c9153A6bB24292d2671270203";
const contract = new web3.eth.Contract(ABI, contractAddress);


//----------------------------------------------------------------
app.post("/createTender", async (req, res) => {
  try {
    const {
      name,
      contractTitle,
      description,
      startDate,
      endDate,
    } = req.body;

console.log(name, contractTitle, description, startDate, endDate);

web3.eth.getAccounts().then(accounts => {
  const account = accounts[0]; 
  contract.methods.createTender(name, contractTitle, description, startDate, endDate)
  .send({ from: account, gas: 3000000, gasPrice: web3.utils.toWei('1', 'wei') })
  .on('receipt', console.log)
  .on('error', console.error);
  
});
res.status(200).json({ status: 200, message: "Tender Created" });

  } catch (error) {
    res.status(500).json({ status: 500 });
    console.error(error);
  }
});
//-------------------------------------------------------------------


app.get("/getAllTenders", async (req, res) => {
  try {
    
    const tenderCount = await contract.methods.tenderCounter().call();
    let allTenders = [];

    for (let i = 0; i < tenderCount; i++) {
        const tenders = await contract.methods.getTendersForId(i).call();
        allTenders.push(...tenders);
    }

    res.status(200).json({ status: 200, allTenders });
  } catch (error) {
    res.status(500).json({ status: 500 });
    console.error(error);
  }
});


//------------------------------------------------------------------------

app.post('/placeBid', async (req, res) => {
  const { tenderId, name, companyName, contactNumber, bid, account } = req.body;

  try {
    await contract.methods.placeBid(tenderId, name, companyName, contactNumber, bid)
      .send({ from: account, gas: 3000000, gasPrice: web3.utils.toWei('1', 'wei') })
      .on('receipt', console.log)
      .on('error', console.error);

    res.status(200).json({ status: 200 });
  } catch (error) {
    res.status(500).json({ status: 500 });
    console.error(error);
  }
});

//----------------------------------------------------------------------------------

app.get('/getContractorsForTender', async (req, res) => {
  const tenderId = req.params.tenderId;

  try {
    const contractors = await contract.methods.getContractorsForTender(tenderId).call();
    res.status(200).json({ status: 200, contractors });
  } catch (error) {
    res.status(500).json({ status: 500 });
    console.error(error);
  }
});

//------------------------------------------------------------------
app.post('/assignContract', async (req, res) => {
  const { tenderId, account } = req.body;

  try {
    await contract.methods.assignContract(tenderId)
      .send({ from: account, gas: 3000000, gasPrice: web3.utils.toWei('1', 'wei') })
      .on('receipt', console.log)
      .on('error', console.error);

    res.status(200).json({ status: 200 });
  } catch (error) {
    res.status(500).json({ status: 500 });
    console.error(error);
  }
});



// async function getAllTenders() {
//   const tenderCount = await contract.methods.tenderCounter().call();
//   let allTenders = [];

//   for (let i = 0; i < tenderCount; i++) {
//       const tenders = await contract.methods.getTendersForId(i).call();
//       allTenders.push(...tenders);
//   }

//   return allTenders;
// }

// getAllTenders().then(console.log).catch(console.error);





//---------------------------------------------------------------
// 



app.get("/getAllTenders", async (req, res) => {
  try {

    const tenders = await Tender.find();
    return res.status(200).json({ tenders });

  } catch (error) {

    return res.status(401).json({ error });

  }

})

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

