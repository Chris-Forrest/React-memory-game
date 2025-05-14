import { useState } from 'react';
import Form from './components/Form';
import MemoryCard from './components/MemoryCard';


function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [ emojisData, setEmojisData] = useState([]);
  
  
  async function startGame(e) {
    e.preventDefault()
    try{
      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")
      if(!response.ok){
        throw new Error(e, " Error fetching data")
      }

      const data = await response.json()
      const dataSample = data.slice(0,10)
      console.log(getRandomNumbers(data))
      
      setEmojisData(dataSample)
      setIsGameOn(true)
    } catch {
      console.log(e)
    }
    
  };

  function getRandomNumbers(data){
    const randomNumbersArray = [];

    for(let i = 0; i < 10; i++){
      const randomNums = Math.floor(Math.random() * data.length)
      if(!randomNumbersArray.includes(randomNums)){
        randomNumbersArray.push(randomNums)
      }else{
        i--      }
    }
    return randomNumbersArray;
  };

  function turnCard() {
    console.log("Memory card clicked")
  };
  

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
    </main>
  )
}

export default App
