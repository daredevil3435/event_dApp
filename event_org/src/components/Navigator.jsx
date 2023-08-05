import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Navigator.css'
const Navigator = () => {

    const navigateTo = useNavigate();

    function returnHome(){
        navigateTo("/view-all-events");
    }
  return (
    <div>
      <header>
        <img onClick={returnHome} className='logo-img' src='src/assets/Event Ease.png' alt='logo'/>
      <div onClick={returnHome} className="logo">Event Ease</div>
      <nav>
        <ul>
          <li>
            <Link className="nav_link" to="/view-all-events">
              View All Events
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/create-event">
              Create Event
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view-event">
              View Event
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/buy-ticket">
              Buy ticket
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/transfer-ticket">
              Transfer ticket
            </Link>
          </li>
          
        </ul>
      </nav>
      </header>
    </div>
  )
}

export default Navigator
