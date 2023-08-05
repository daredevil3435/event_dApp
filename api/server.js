const express = require("express")
const ABI = require("./ABI.json")
const {Web3} = require("web3")
const cors = require("cors");
const app = express();

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
})


const adderss = "0xd36b603b984C2D46c7286B669d32408C8D3D0435";

app.use(cors());
app.use(express.json());

const web3 = new Web3("https://serene-spring-hill.ethereum-sepolia.discover.quiknode.pro/c3076bfe23edf6b2bad445cdf4159b518182f9a1/");
const contract = new web3.eth.Contract(ABI,adderss);

console.log(contract);

const dateClashCheck = async(eventDate) => {
    const events = await contract.methods.viewAllEvents().call();
    const foundEvent = events.find(event => event.date === eventDate);

    if(foundEvent){
        return foundEvent.name;
    }
    
    return "No event found";
}

const isValid = async(eventID)=>{
   
      const total = await contract.methods.nextId().call();

      if(eventID>total){
        return "Invalid ID"
      
      

   }
   return "Valid ID";
}

app.get("/api/ethereum/view-event/:eventID", async(req,res)=>{
    try{
       const {eventID} = req.params;

       const Event = await contract.methods.viewEvent(eventID).call();
       console.log(Event);
       const {id,name,date,price,no_of_tickets,tickets_rem}=Event;

       const numId = Number(id);
       const numPrice = Number(price);
       const numTicket = Number(no_of_tickets);
       const numTicketsLeft = Number(tickets_rem);
       
       const eventObj = {
        numId, 
        name,
        date,
        numPrice,
        numTicket,
        numTicketsLeft,
       }

       console.log(eventObj);

       res.status(200).json({status:200,eventObj,message:"event exists"})

    }catch(error){
        res.status(500).json({status:500,message:"event does not exists"})
    }
})

app.get("/api/ethreum/view-all-events",async(req,res)=>{
    try{
        const events = await contract.methods.viewAllEvents().call();

        if(events.length<0){
            res.status(404).json({status:500,message:"No events found"})
        }
        else{
            const eventList = events.map(({id,name,date,price,no_of_tickets,tickets_rem})=>{
                const numId = Number(id);
                const numPrice = Number(price);
                const numTicket = Number(no_of_tickets);
                const numTicketsLeft = Number(tickets_rem);
                return {numId,name,date,numPrice,numTicket,numTicketsLeft};
            })

            res.status(200).json({status:200,eventList,message:"Task list printed"})
        }
    }
    catch(error){
        console.log(error);
        res.status(404).json({status:404,message:"No events found"})
    }
})

app.post("/api/ethereum/create-event",async(req,res)=>{
    const {eventDate} = req.body;

    const event = await dateClashCheck(eventDate);

    try{
        if(event !== "No event found"){
            res.status(409).json({status:409,message:"Date clashed with exising event"});
        }
        else{
            res.status(200).json({status:200,message:"event can be organized"});
        }

    }catch(error){
        console.error(error);
    }
})

app.post("/api/ethereum/buy-ticket", async(req,res)=>{
    const {eventID} = req.body;

    const validity = await isValid(eventID);

    try{
        if(validity !=="Valid ID"){
            res.status(409).json({status:409,message:"Invalid ID"})

        }
        else{
            res.status(200).json({status:200,message:"Valid ID"});
        }
    }catch(error){
        console.log(error);
    }
})

app.post("/api/ethereum/transfer-ticket", async(req,res)=>{
    const {eventId} = req.body;

    const validity = await isValid(eventId);
    try{
        if(validity !=="Valid ID"){
            res.status(409).json({status:409,message:"Invalid ID"})

        }
        else{
            res.status(200).json({status:200,message:"Valid ID"});
        }
    }catch(error){
        console.log(error);
    }

})