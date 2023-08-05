import React,{useState} from 'react'
import Navigator from './Navigator';
const BuyTicket = ({state}) => {

    const [qty, setQty] = useState(1);

    const {contract,account} = state;
    console.log(contract);
    console.log(account);

    const buyTicket = async(event)=>{
        event.preventDefault();

        const eventId = document.querySelector('#eventId').value;
        const ticketQty = document.querySelector('#ticketQty').value;

        try{
            const res = await fetch("http://localhost:3000/api/ethereum/buy-ticket",
            {
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(
                    {eventId:eventId}
                )

            })

            const data = await res.json();
            console.log(data);
            if(data.status === 200){
                if(contract && contract.methods){
                    const event = await contract.methods.viewEvent(eventId).call();
                    const price_ = event.price;
                    const price = Number(price_);
                    await contract.methods
                    .buyTicket(eventId,ticketQty)
                    .send(
                        {
                            from:account,
                            value:price*ticketQty
                        })
                }
            }
        }catch(error){
            console.error(error);
        }
    }
  return (
    <div>
        <Navigator />
      <form onSubmit={buyTicket}>
       <label>
        ID:
        <input type='number' id='eventId' />
       </label>
       <label>
       Quantity:
       <input type='number' value={qty} id='ticketQty' onChange={(e)=>setQty(e.target.value)}/>
       </label>
       <button type='submit'>Buy</button>
      </form>
    </div>
  )
}

export default BuyTicket
