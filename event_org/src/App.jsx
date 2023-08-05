import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AllEvents from './components/AllEvents'
import ViewEvent from './components/ViewEvent'
import CreateEvent from './components/CreateEvent'
import BuyTicket from './components/BuyTicket'
import Transfer from './components/Transfer'
function App() {
  
  const [state, setState] = useState({web3:null,contract:null,account:null})

  const saveState = ({web3, contract, account})=>{
    setState({
      web3:web3,
      contract:contract,
      account:account
  });
  }


  const router = createBrowserRouter([
    {path:'/',element:<Home saveState={saveState}/>},
    {path:'/view-all-events',element:<AllEvents/>},
    {path:'/view-event',element:<ViewEvent/>},
    {path:'/create-event',element:<CreateEvent state={state}/>},
    {path:'/buy-ticket',element:<BuyTicket state={state}/>},
    {path:'/transfer-ticket',element:<Transfer state={state}/>}

  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
