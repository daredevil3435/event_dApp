import React, { useState } from 'react'
import Navigator from './Navigator'
const Transfer = ({state}) => {
    const [qty, setQty] = useState(1);
    const {contract,account} = state;
    const transferTickets = async(event)=>{
       event.preventDefault();
       const eventId = document.querySelector('#eventId').value;
       const Quantity = document.querySelector('#qty').value;
       const receiver = document.querySelector('#toAddress').value;

       try
       {
         const res = await fetch("http://localhost:3000/api/ethereum/transfer-ticket",
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
                const instance = await contract.methods.viewEvent(eventId).call();
                const tickets_left = instance.tickets_rem;
                const tickets_remaining = Number(tickets_left);
                console.log(tickets_remaining);
                alert(`Only ${tickets_remaining} left in stock`)
                if(Quantity <= tickets_remaining){
                    await contract.methods
                    .transferTicket(eventId,Quantity,receiver)
                    .send(
                        {
                            from:account
                            
                        }
                    )

                    alert("Traansfer succeful!!!")
                }
            }
         }

       }catch(error){
           console.log(error);
           alert("Tickets are out of stock")
       }
    }
  return (
    <div>
        <Navigator/>
      <form onSubmit={transferTickets}>
          <label>
            Event ID:
            <input type='number' id='eventId'/>
          </label>
          <label>
            Quantity :
            <input type='number' id='qty' value={qty} onChange={(e)=>setQty(e.target.value)}/>

          </label>
          <label>
            Address:
            <input type='string' id='toAddress'/>
          </label>
          <button type='submit'>Transfer</button>
      </form>
    </div>
  )
}

export default Transfer
