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
      const dataSlice = await getRandomEmojis(data)
      const emojisArray = await getEmojisArray(dataSlice)
      
      setEmojisData(emojisArray)
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

  async function getRandomEmojis(data){
    const emojisForGameplay = getRandomNumbers(data);

    return emojisForGameplay.map(index => data[index])
  };

  async function getEmojisArray (data){
    const pairedEmojisArray = [...data, ...data]

    for (let i = pairedEmojisArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1))
      const temp = pairedEmojisArray[i]
      pairedEmojisArray[i] = pairedEmojisArray[j]
      pairedEmojisArray[j] = temp 
    }

    return pairedEmojisArray;

  };

  function turnCard(name, index) {
    console.log(`The emoji ${name} at index ${index} has been clicked`)
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
