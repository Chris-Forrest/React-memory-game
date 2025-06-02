import { useState, useEffect } from 'react';
import Form from './components/Form';
import MemoryCard from './components/MemoryCard';
import AssistiveTechInfo from './components/AssistiveTechInfo';


function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [ emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelecetedCards ] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  

  
  useEffect(() => {
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name){
      setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
    }
  }, [selectedCards]);

  useEffect(() =>{
    if (emojisData.length && matchedCards.length === emojisData.length){
      setAreAllCardsMatched(true)
    }
  }, [matchedCards]);
  
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
    
    const selectedCardEntry = selectedCards.find(emoji => emoji.index === index);
    
    if (!selectedCardEntry && selectedCards.length < 2) {
      setSelecetedCards(prevSelectedCards => [...prevSelectedCards, {name, index}]) 
    
    }else if (!selectedCardEntry && selectedCards.length ===2){
      setSelecetedCards([{ name: name, index: index }]);
    }
  };

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && !areAllCardsMatched && 
          <AssistiveTechInfo 
              emojisData={emojisData}
              matchedCards={matchedCards}/>}
      {isGameOn && 
          <MemoryCard 
              handleClick={turnCard} 
              data={emojisData} 
              selectedCards={selectedCards} 
              matchedCards={matchedCards} />}
    </main>
  )
}

export default App
