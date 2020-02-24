import React, {useEffect} from 'react';

import {CSSTransition} from 'react-transition-group';
import { useState } from 'react';

function MessageContainer (props) {

const [animation, setAnimation]=useState(false);

// useEffect hook is being ran every time when the newMessage
// state is passed down the component.
useEffect( () =>{
    if(animation){
        setAnimation(false)
    } else setAnimation(true)
}, [props.newMessage] );

return(
    <div className="message-container">
        <div className="message-box">
        {/* CSS transition is being used to handle the animation 
        classNames can be found in App.css file*/}
        <CSSTransition
        in={animation}
        classNames="alert"
        timeout={4000}
        unmountOnExit>
            <span>{props.message}</span>
        </CSSTransition>
        </div>
    </div>
    )
}

export default MessageContainer;