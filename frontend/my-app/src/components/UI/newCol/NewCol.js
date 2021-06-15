import React from 'react'
import { Input,Col, Row,Button } from 'antd';

function NewCol(props) {
    return (
        <div>
               <input  className="form-control"  placeholder={props.placeholder} onChange={props.changed} />
        </div>
    )

    
}

export default NewCol
