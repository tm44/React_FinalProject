import React from 'react';
import { Button } from 'react-bootstrap';

export default function AddEditItem({source, target, onChangeSource, onChangeTarget, onSave, id}) {

    return (
        <>
        <div>
            <input onChange={onChangeSource} type="text" value={source || ''} />
        </div>
        <div>
            <input onChange={onChangeTarget} type="text" value={target || ''} />
        </div>
        <Button onClick={onSave}>Save</Button>
        </>
    )
}
