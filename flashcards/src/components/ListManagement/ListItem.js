import React from 'react';
import { Button } from 'react-bootstrap';

export default function ListItem({source, target, itemId, onEdit}) {

    return (
        <div className="row">
            <div className="col-sm-4">
                {source}
            </div>
            <div className="col-sm-4">
                {target}
            </div>
            <div className="col-sm-4">
                <Button id={itemId} onClick={() => onEdit(itemId)} variant="link">Edit</Button>
                {/* <Button onClick={() => {console.log(id)}} variant="link">Edit</Button> */}
                <Button variant="link">Delete</Button>
            </div>
        </div>
    )
}
