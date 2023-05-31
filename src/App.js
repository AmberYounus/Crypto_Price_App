import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Coin from './Components/Coin';

function App() {
  const[listOfCoins,setListOfCoins] = useState([]);
  const[searchWord,setSearchWord] = useState("")
  useEffect(()=>{
   Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(

  //  Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=10").then(
    (response)=>{
      setListOfCoins(response.data.coins)
      // console.log(response.data);
    }
   )
  },[])
  const filteredCoins =listOfCoins.filter((coin)=>{
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })
  return (
    <div className="App">
      <div className="cryptoHeader">
      <h2>Crypto Price</h2>
        <input type="text" placeholder='Bitcoin...' onChange={(event)=>{
          setSearchWord(event.target.value)
        }}/>
      </div>
    <div className="cryptoDisplay">
    <div class="col-sm-3 col-md-9 col-lg-4 col-xl-2">

      {filteredCoins.map((coin)=>{
        return <Coin name={coin.name} icon={coin.icon} price={coin.price} symbol={coin.symbol}/>
      })}
    </div>
    </div>
    </div>
  
  );
}

export default App;
