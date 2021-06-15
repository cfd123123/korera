import React from 'react';

import './Input.css';

const input = (props) =>{
    let inputElement = null;
    /*
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    */
    /* inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break; 
    */
    //console.log(props);
    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <div className="form-group" >
                                <label>{props.elementConfig.type}</label>
                                <input  className="form-control" 
                                        {...props.elementConfig}
                                        value={props.value}
                                        onChange={props.changed}/>
                            </div>
            break;
        default:    
            inputElement = <input
                /* className={inputClasses.join(' ')} */
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;       
    }


    return (
        /*
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
        */
        <div>
            {inputElement}
        </div>
        
    );
}

export default input;