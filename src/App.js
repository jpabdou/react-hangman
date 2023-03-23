import React, { useState, useEffect } from 'react';
import './index.css';
import words from './words.js';
import './App.css';


function App() {

  function Randomizer(array) { 
    let word = array[Math.floor(Math.random() * array.length)]
    return [word, word.length]
  };
  
  let wordData =Randomizer(words)
  let initialGame= {word: wordData[0], guess: "", warning: null, gameState: 4}

  
  function gameStart() {
    let wordData =Randomizer(words)
    let initialGame= {word: wordData[0], guess: "", warning: null,gameState: 4}
    setGuessHist([])
    setGame({...initialGame})
    setHidden("*".repeat(wordData[1]))
    setTries(6)
  }

  

  
  function Replacer(hidden_word, guess_letter) {
    let TempHidden = hidden_word.split("");
    let TempWord = game.word.split("");
    for (let z = 0; z < TempWord.length; z++) {
      if (guess_letter === TempWord[z]) {
        TempHidden[z] = guess_letter;
      }
    }
    TempHidden = TempHidden.join("")
    return TempHidden
  }

  function checkGuess(string) {
    const charCode = string.charCodeAt(0)
    var guessLength = string.length;
    if (charCode !== 0) {
      if (charCode < 97 || charCode > 122) {
        setDisabled(true)
        setGame({...game, "warning": `Please use lowercase letters only. Character Submitted: ${string}`})
      } else {
        if (guessLength == 1) {
          setDisabled(false)
          setGame({...game, "warning": null})
        } else {
             setDisabled(true)
            setGame({...game, "warning": `Please use 1 lowercase letter only. Letter Count: ${guessLength}`})
          }
      }
    }
}

  const [game, setGame] = useState({...initialGame})
  const [tries, setTries] = useState(6)
  const [hidden, setHidden] =useState("*".repeat(wordData[1]))
  const [disabled, setDisabled] = useState(false)
  const [guessHist, setGuessHist] = useState([])
  
  useEffect(()=>{
    if (!hidden.includes("*")) {
    setGame({...game, "gameState": 0})
    } else {
      setGame({...game, "gameState": 3})
}}, [hidden])

  useEffect(()=>{(checkGuess(game.guess))},[game.guess])
  function Game(hidden_word, guess) {
          if ((game.word.includes(guess))===false) {
              if (tries > 1) {
                setTries(tries-1)
                setGame({...game, ["gameState"]: 1})
                  } else {
                    setTries(tries-1)
                    setGame({...game, ["gameState"]: 2})
                  }} 
                  else {
                        let newHidden = Replacer(hidden_word, guess)
                        setHidden(newHidden)
                        console.log(hidden)
}}
const messages = [`Yay! You got it! It's ${game.word}.`, 
`Hidden word is: ${hidden}. Sorry! Letter not found. You have ${tries} tries left.`, 
`Sorry! The man has been hanged. The word is ${game.word}.`,
`Hidden word is: ${hidden}. Correct! Keep going.`,
`Hidden word is: ${hidden}. Try guessing a letter!`
]

return (
  <div>
  <h1>Good Luck!</h1>
  <h2>{messages[game.gameState]}</h2>        
    
    <form onSubmit={(e) => {
        e.preventDefault();
        if (game.gameState !== 2) {
        setGuessHist([...guessHist, game.guess])
        (Game(hidden,game.guess))}
        }}>
      <p>{game.warning}</p>
      <label>Enter your guess (1 lowercase letter) for {hidden}:
        <input 
        type="guess-letter"
        value={game.guess}
        onChange={(e) => 
        setGame({...game, "guess": e.target.value})} />
      </label>
      <input disabled={disabled} type="submit" />
    </form>
    <p>{`Your guesses so far: ${guessHist}`}</p>
    <img src={require(`./Images/${tries}.jpg`)} alt="hangman image"></img>
    {game.gameState === 0 || game.gameState === 2 ? <button onClick={()=>{
      gameStart()
    }}>Play again?</button> : null}
  </div>

)

}

export default App;
