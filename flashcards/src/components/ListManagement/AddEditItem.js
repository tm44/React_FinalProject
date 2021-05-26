import React from 'react';
import { Button } from 'react-bootstrap';

export default function AddEditItem({source, target}) {
    return (
        <>
        <div>
            <input type="text" value={source} />
        </div>
        <div>
            <input type="text" value={target} />
        </div>
        <Button>Save</Button>
        </>
    )
}
