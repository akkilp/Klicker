// Import global variables from 'serverData.js'
var serverData = require('./serverData')
var {players, currentClick} = serverData;


// Define schema for new user
function Player(name, clicks, nextWin) {
    this.name = name;
    this.points = 20;
    this.clicks = clicks,
    this.nextWin= nextWin,
    this.message= "Welcome " + this.name
}

// Return user from 'players' array
function findUser(currentUser){
    return (players.find(player => player.name===currentUser))
}
  
function updateData(user, method){
    // Method passed in function defines how the data is handled
    
    // Play ==  Update == /PATCH
    if(method === "play"){
        // Check if the user has points left to play
        if(user.points !== 0){
            //TAKE AWAY POINT
            user.points---1;
            //ADD ONE TO CLICKER
            currentClick+=1;

            // Look for a win, return 0 if no wins
            // Add points to user
            let win = winCounter(currentClick)
            user.points += win;
            
            //  Calculate the next win and clicks before the next win
            user.clicks = clicksToNextWin(currentClick)   
            user.nextWin = nextWinAmount(currentClick)

            //
            user.message = findMessage(method,user,win)
            return user
        }  

        // If no points, just return the message to user
        else {
            user.message = findMessage(method,user)
            return user
        }
}
    // Reset == Update == /PUT
    if(method === "reset"){
        user.points = 20;
        user.message = findMessage(method,user)
        user.clicks = clicksToNextWin(currentClick)   
        user.nextWin = nextWinAmount(currentClick)
        return user
    }
    
    // Fetch == Read == /GET
    if(method === "fetch"){
        user.message = findMessage(method,user)
        user.clicks = clicksToNextWin(currentClick)   
        user.nextWin = nextWinAmount(currentClick)
        return user
    }
}

// If remainder of currentClick = 0 --> Pass it to following if
// Return largest possible true value
function winCounter () {
    if(currentClick%10===0){
        if(currentClick%100===0){
            if(currentClick%500===0){
                return 250
            } return 40
        } return 5
    } else return 0
}

// Look for the next win, always return the biggest variable that's true
function nextWinAmount (currentClick) {
    let winSmall = currentClick%10-10
    let winMedium = currentClick%100-100
    let winBig = currentClick%500-500
        if(winSmall===winMedium){
            if(winBig===winMedium){
                return "250"
            }
            return "40"
        }
    return "5"
}

// Every 10'th click wins, so we just have to keep track on that
// nextWinAmount handles the amount
// Returns negative number --> Math library to turn it into positive
function clicksToNextWin (currentClick){
    let clicksToWin = Math.abs(currentClick%10-10)
    return clicksToWin
}


// Handles updating the message
// Method passed in updateData() is also being used in this function to select proper message to user
function findMessage (method,user,win) {
    if(method === "play"){
        if(win){
            return "You won " + win
        } 
        if(user.points===0){
            return "Game over!"
        }
    }

    if(method === "fetch"){
        return "Welcome back, " + user.name
    }

    if(method === "reset"){
        return "Better luck this time!"
    }

    else return null;    
}

// Export functions to routes
module.exports = {
    Player,
    findUser,
    updateData,
    nextWinAmount,
    clicksToNextWin,
}
