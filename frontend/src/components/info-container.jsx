import React from 'react';

// Info container, 3 info boxes
// Upper box shows points
// Lower boxes show clickToNextWin and nextWinAmount

function InfoContainer (props) {
    
return(

    <div className="info-container">
        <div className="points">
            <p>Your points</p>
            <div className="content">
                <h2>{props.points}</h2>
            </div>
        </div>
        <div className="next-info">
            <div className="clickstonext">
                <p>Clicks to win</p>
                <div className="content">
                    <h2>{props.clicksToNext}</h2>
                </div>
            </div>
             <div className="nextamount">
                <p>Next win </p>
                <div className="content">
                    <h2>{props.nextWin}</h2>
                </div>
            </div>
        </div>
    </div>
)
}

export default InfoContainer;