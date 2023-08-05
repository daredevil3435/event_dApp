import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import ABI from './ABI.json'

const Home = ({saveState}) => {

    const navigateTo = useNavigate();
    const [walletAddress, setWalletAddress] = useState('');
    const address = "0xd36b603b984C2D46c7286B669d32408C8D3D0435";

    const connectWallet = async() =>{
        try{
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method : "eth_requestAccounts"
                })
                console.log(web3,accounts);

                setWalletAddress(accounts[0]);

                const contract = new web3.eth.Contract(ABI,address);
                console.log(contract);
                saveState({web3:web3, contract:contract, account:accounts[0]});
                navigateTo("/view-all-events");
            }
            else{
                throw new Error;
            }

        }catch(error){
            console.log(error);
        }
    }

  return (
    <div>
      <div>
        <h1>Welcome</h1>
        <button onClick={connectWallet}>Connect wallet</button>
      </div>
    </div>
  )
}

export default Home
