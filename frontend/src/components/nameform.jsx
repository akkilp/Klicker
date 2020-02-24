import React,{useState} from 'react';

//NameForm function handles for POST request, when new user is created

function NameForm (props) {
    
// name state is being updated in onChange of <input>
const [name, setName] = useState("")

// When submit button is pressed, POST request is being sent from parent
// component.
const handleSubmit = (event) => {
    event.preventDefault();
    if(name && !props.user){
        props.callApi('CREATE', name)
    }
}

    return(    
            <div className="button-container">
                <div className="form-button-frame">
                    <form onSubmit={handleSubmit} className="form">
                        <label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={event => setName(event.target.value)}
                            />
                        </label>
                        <div className="submit hvr-pop" type="submit" value="Submit" onClick={handleSubmit}>
                            Submit
                        </div>
                    </form>
                </div>
            </div>
    )
     
}

export default NameForm;