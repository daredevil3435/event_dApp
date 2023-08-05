import React,{useState} from 'react'
import Navigator from './Navigator';
import EventTable from './EventTable';
const ViewEvent = () => {

    const [Event, setEvent] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const viewEvent = async(event)=>{
        try{
            event.preventDefault();
            const eventId = document.querySelector('#eventId').value;
            const res = await fetch(`http://localhost:3000/api/ethereum/view-event/${eventId}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json"
                }
            })

            const data = await res.json();

            if(data.status === 200){
                setEvent(data.eventObj);
            }
            else{
                throw new Error();
            }
            console.log(data);
        }
        catch(error){
            setModalContent("No event found");
            setModalVisible(true);
            console.log(error)
        }
    }
    const closeModal = () =>{
        setModalVisible(false);
        setModalContent("");
        
      }

      console.log(modalContent);
    
  return (
    <div>
        <Navigator />
        <div>

      <form onSubmit={viewEvent}>
        <label>
            Event-id:
            <input id='eventId'/>
        </label>
        <button type='submit'>View</button>
      </form>
            {Event.numId!==null && Event.name!==null && Event.date!==null ? (
            <>
            <table>
                   <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Tickets</th>
                        <th>Tickets Left</th>
                      </tr>
                 </thead>
                 <tbody>
                 
                         <tr key={Event.numId}>
                         <td>{Event.numId}</td>
                         <td>{Event.name}</td>
                         <td>{Event.date}</td>
                         <td>{Event.numPrice}</td>
                        <td>{Event.numTicket}</td>
                        <td>{Event.numTicketsLeft}</td>
                 </tr>
                 
                </tbody>
            </table>
            </>
             ):(
                <div></div>
            )}

        </div>
      {/* {modalVisible && (
        <>
       
       {modalContent}
       
                </>
      )} */}
        

    </div>
  )
}

export default ViewEvent
