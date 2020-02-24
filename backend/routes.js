var express = require('express')

// Using router to make things a bit cleaner!
// (im trying to get better in code structure and find the best practises for clean code)
var router = express.Router()

// serverData are global variables with "players" array and currentClick variable
var serverData = require('./serverData')

// Functions include functionality behind the routes
var functions = require ('./functions')

// Import global variables
var {
    players, 
    currentClick
    } = serverData;

// Import functions
var {
    Player,
    findUser,
    updateData,
    nextWinAmount,
    clicksToNextWin,
    } = functions;


// Middleware for all paths requested from client
// 1. Takes parameters from request address and saves them to currentUser
// 2. Checks if user is found and saves the variable to res.locals.userFound (variable that is remembered through the request)
// 3. Redirects or ends the request based on conditions below
router.all('/user/:id', async function checkForUser(req, res, next){
    try{
        let currentUser = req.params.id;
        res.locals.userFound = await findUser(currentUser)
        if(res.locals.userFound && req.method!=="POST"){
            next()
        } 
        if(!res.locals.userFound && req.method==="POST"){
            next()
        }
        if(res.locals.userFound&&req.method=="POST"){
            res.send("User already exists")
        }
        if(!res.locals.userFound && req.method!=="POST") {
            res.send("User was not found")
        }
    }
    catch(err){
        console.log(err)
    }
});


// GET path, returns the data of requested used
router.get('/user/:id', async (req,res,next) =>{
    let userData = await updateData(res.locals.userFound, "fetch")
    res.json(userData)
})

// POST path, creates a new "Player" (defined in functions.js)
router.post('/user/:id', async (req,res,next) =>{
    try{
        let player = await new Player(req.params.id, clicksToNextWin(currentClick), nextWinAmount(currentClick))
        players.push(player)
        res.send(player)
    }
    catch(err){
        console.log(err)
    }   
})

// PATCH path, this is the game button that updates the data to the client
router.patch('/user/:id', async (req,res) =>{
    let userData = await updateData(res.locals.userFound, "play")
    res.json(userData)
})

// PUT path, this one is being used to reset the game when points are 0
router.put('/user/:id', async (req,res) =>{
    let userData = await updateData(res.locals.userFound, "reset")
    res.send(userData)
})

module.exports = router