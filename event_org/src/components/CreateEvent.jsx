import React,{useState} from 'react'
import Navigator from './Navigator';
const CreateEvent = ({state}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const {contract, account} = state;

    const closeModal = () =>{
        setModalOpen(false);
        setModalContent("");
    }

    const createEvent = async(event) =>{
        event.preventDefault();


        console.log(contract);

        const eventName = document.querySelector("#eventName").value;
        const eventDate = document.querySelector("#eventDate").value;
        const price = document.querySelector("#price").value;
        const tickets = document.querySelector("#tickets").value;

        try{
            console.log(account);

            const res = await fetch("http://localhost:3000/api/ethereum/create-event",
            {
                method:"POST",
                headers:
                {
                    "content-type":"application/json"
                },

                body:JSON.stringify(
                    {eventDate:eventDate}
                )
            })

            console.log(account);

            const data = await res.json();
            if(data.status === 200){
                if(contract && contract.methods){
                    await contract.methods
                    .createEvent(eventName,eventDate,price,tickets)
                    .send({from:account});

                    setModalContent(`Event  ${eventName} added at ${eventDate}`);
                }
                else{
                    alert("Event caanot be added")
                }
                console.log(data);
            }


        }catch(error){
            setModalContent(`Event  ${eventName} added at ${eventDate}`)
            console.error(error);

        }finally{
            setModalOpen(true);
        }

    } 








  return (

    <div>
        <Navigator />
      <div>
        <form onSubmit={createEvent}>
            <label>
                Name: 
                <input id='eventName' type='string'/>
            </label>
            <label>
                Date: 
                <input id='eventDate' type='string'/>
            </label>
            <label>
                Price: 
                <input id='price' type='number'/>
            </label>
            <label>
                Total Tickets: 
                <input id='tickets' type='number'/>
            </label>
            <button type='submit'>Create</button>
            
        </form>

        {modalOpen && (
              <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>{modalContent}</p>
              </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default CreateEvent
