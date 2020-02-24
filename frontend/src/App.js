import React, {useState, useEffect} from 'react';
import './App.css';

import MessageContainer from './components/message-container'
import InfoContainer from './components/info-container'
import GameButton from './components/game-button'
import NameForm from './components/nameform'
import Logo from './components/logo'


// Use axios for backend API interactions
const axios = require('axios').default;

function App() {

// Define states
  const [user, setUser] = useState("")
  const [points, setPoints] = useState("")
  const [clicksToNext, setClicksToNext] = useState("")
  const [nextWin, setWinAmount] = useState("")
  const [message, setMessage] = useState("What is your name?")
  const [gameOver, setGameOver] = useState(false)
  const [newMessage, setNewMessage] = useState(true)
  const [loading, setLoading] = useState(true)


  // Every time component is mounted, local cache is being searched for past user
  useEffect( () =>{
    findUser()
  }
  , [] );

  // When user is confirmed by backend --> save that user to local cache
  useEffect( () => {
    if(user)
    localStorage.setItem('user',user)
  }
  , [user]);



  // /GET
  // If user if found in cache, send GET request to backend
  async function findUser() {
    let userFound = localStorage.getItem('user')
    userFound ? await callApi("FETCH", userFound)
              : setLoading(false)
  }

  // /PATCH
  // When user has been defined and game is not over by pressing the button
  // user is able to play the game.
  // Sends /PATCH request to backend.
  const handleClick = () => {
    if(!gameOver && user){
      callApi("UPDATE", user)
    }
  }

  // /PUT
  // When game is over and user found, play button turns into reset button
  // Also set gameOver to false when executed
  const handleReset = () => {
    if(gameOver && user){
      callApi("RESET", user)
    }
    setGameOver(false)
  }


  // Main function for axios calls
  // First variable is method and second the value
  // "localhost:3500/user/:value"
  // Method defines whether the request is GET(FETCH), POST(CREATE), PATCH(UPDATE) or PUT(RESET) 
  function callApi (method, user) {
    let address = "http://localhost:3500/user/"+user
    if(method==="FETCH"){
      axios.get(address)
      .then(response => {
          stateHandler(response)
          setLoading (false)
        })
        .catch(err => console.log(err))
      }

    if(method=="CREATE"){
      axios.post(address)
      .then(response => {
        stateHandler(response)
    }) .catch(err => console.log(err))
    }

    if(method=="UPDATE"){
      axios.patch(address)
      .then(response => {
        stateHandler(response)
    }) .catch(err => console.log(err))
    }

    if(method=="RESET"){
      axios.put(address)
      .then(response => {
        stateHandler(response)
    }) .catch(err => console.log(err))
    }
  }

  // State handler turns the JSON into React states
  function stateHandler (response){
    console.log(response)
    setUser(response.data.name)
    setPoints(response.data.points)
    setClicksToNext(response.data.clicks)
    setWinAmount(response.data.nextWin)
    // If backend sends message with content, also set newMessage to true
    // newMessage handles for message-container animations (that's been made very hard with react!)
    if(response.data.message){
      setMessage(response.data.message)
      setNewMessage(true)
    } else setNewMessage(false)

    // Refuse state update when game is over 
    // Backend has also filter for this
    if(response.data.points === 0){
      setGameOver(true)
    }
  }

  return (
      <div className="App">
        {/* findUser function sets loading true after its execution --> Application displays */}
        {loading==false ? (
          <div className="main-container">
          {/* Logo contains "KLICKER"-header */}
          <Logo/>
          {/* Messagecontainer handles the messages in the upper container */}
          <MessageContainer message={message} setMessage={setMessage} newMessage={newMessage}/>
          {/* When user is found with GET or created with POST, game info is being displayed */}
          {user ? 
          (
            <>
              {/* Contains information about points, nextWin and clicksToNextWin */}
              <InfoContainer 
              points={points} 
              nextWin={nextWin} 
              clicksToNext={clicksToNext}/>
             
             {/* 
             Gameover = false --> Button can be used to play the game
             When points are 0, gameOver is set true
             Gamebutton is then rendered with RESET functionality */}
              {gameOver ? 
              (
                <GameButton
                handleClick={handleReset}
                gameOver={gameOver}
                />
                ):(
                <GameButton
                handleClick={handleClick}
                gameOver={gameOver}
                />
                )}
            </>
          ):(
            // While user is not defined, NameForm is rendered instead of
            // InfoContainer and GameButton
            // NameForm handles the POST(CREATE) request
            <NameForm 
            callApi={callApi} 
            user={user}
            />
          )}
        </div>
      ): 
      // When loading is true, show only this
      <h1>LOADING</h1>}
      </div>
      );
    }
    
    export default App;
    