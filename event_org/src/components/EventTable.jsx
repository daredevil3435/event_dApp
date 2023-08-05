import React,{useState} from 'react';
import './Table.css'; 
import Modal from 'react-modal'
import {useNavigate} from 'react-router-dom'
const EventTable = ({ eventList }) => {

    // const buyTicket = async(event) =>{
    //    event.preventDefault();

  
    // }

    const navigateTo = useNavigate();
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width:'440px',
          height:'500px',
          alignment:'center',
          color:'white',
          backgroundColor:'black'
        },
       

       
      };
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = async() =>{
        setModalOpen(true);

    }
 
    const buyTicket = async() =>{
       navigateTo("/buy-ticket");
    }
    function closeModal() {
       setModalOpen(false);
    }
  return (
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
        {eventList.map((event) => (
            <tr key={event.numId}>
            <td className='id' onClick={openModal}>{event.numId}</td>
            <td className='name' onClick={openModal}>{event.name}</td>
            <td>{event.date}</td>
            <td>{event.numPrice}</td>
            <td>{event.numTicket}</td>
            <td>{event.numTicketsLeft}</td>
           
          </tr>
        ))}
      </tbody>
    </table>

   
    <>
     
    <Modal 
    isOpen={modalOpen}
    style={customStyles}
    >
        <div>
            <h3>Hello welcome to modal</h3>
        </div>

        
        <button onClick={buyTicket}>Buy Ticket</button>
        <button className='close-button' onClick={closeModal}>Close</button>

    </Modal>

 
    </>
      
    </>
  );
};

export default EventTable;
// numTicket,numTicketsLeft
