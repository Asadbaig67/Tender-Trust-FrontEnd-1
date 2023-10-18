
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
    


