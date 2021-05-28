import React from 'react';
import { Button } from 'react-bootstrap';

export default function AddEditItem({english, spanish, onChangeEnglish, onChangeSpanish, onSave, disabled, id}) {

    return (
        <>
        <div>
            <label>English:</label>
            <input onChange={onChangeEnglish} type="text" value={english || ''} />
        </div>
        <div>
            <label>Spanish:</label>
            <input onChange={onChangeSpanish} type="text" value={spanish || ''} />
        </div>
        <Button disabled={disabled} onClick={onSave}>Save</Button>
        </>
    )
}
