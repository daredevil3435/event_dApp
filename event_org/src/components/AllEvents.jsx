import React,{useState,useEffect} from 'react'
import EventTable from './EventTable';
import Navigator from './Navigator';
const AllEvents = () => {

    const [eventList,setEventList]= useState([]);

    useEffect(()=>{
        const allEvents = async() =>{
            try{
                const res = await fetch("http://localhost:3000/api/ethreum/view-all-events"
                ,{
                    method:"GET",
                    headers:
                    {
                        "content-type":"application/json"
                    }
                }
                )

                const data = await res.json();

                if(data.status === 200){
                    console.log(data.eventList);
                    setEventList(data.eventList);
                }
            }catch(error){
                console.error(error);
            }
        }

        allEvents();
    },[])

    // numId,name,date,numPrice,numTicket,numTicketsLeft
  return (
    <div>
        <Navigator />
      <h3>Upcoming Events</h3>
      {/* <div>
        {eventList.map((events)=>{
          return(
            <div key={events.id}
            style={events.id !=="" && events.name!=="" && events.date!=="" ? {}: {display:"none"}}>
                  <p>Id: {events.numId}</p>
                  <p>Name: {events.name}</p>
                  <p>Date: {events.date}</p>
                  <p>Price: {events.numPrice}</p>
                  <p>Tickets: {events.numTicket}</p>
                  <p>Tickets Left: {events.numTicketsLeft}</p>
                  <button>Buy Tickets</button>
                </div>
          )
        })}
      </div> */}
      <EventTable eventList={eventList}/>
    </div>
  )
}

export default AllEvents
