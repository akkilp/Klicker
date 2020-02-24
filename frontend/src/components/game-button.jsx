import React from 'react';

// GameButton component
// Is being used with PATCH(update) and PUT(reset) requests
// handleClick is either handleReset or handleUpdate (check from App.js)
// gameOver state toggles between "Play again" and "Klick"

function GameButton (props) {
    return(
        <div className="button-container">
            <div className="button-frame hvr-pop" onClick={props.handleClick}>
                <div className="button">
                    {props.gameOver 
                        ? 
                        <span>Play again?</span> 
                        : 
                        <span>KLICK</span>
                    } 
                </div>
            </div>
        </div>
    )
}

export default GameButton;