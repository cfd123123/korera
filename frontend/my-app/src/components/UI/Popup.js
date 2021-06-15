import React from 'react'
import './Popup.css'

function Popup(props) {
    return (
        <div className = "popup">
            <div className = "popup_inner">
                <button className = "btn btn-warning b1" onClick = {() => props.addRowHandler()}> add row </button> 
                <button className = "btn btn-warning b2" onClick = {()=> props.setSeen(false)}> close </button>
            </div>
        </div>
    );
}

export default Popup
