import React from 'react';
import {Button } from 'react-bootstrap';

export default function ListItem({english, spanish, itemId, onEdit, onDelete}) {

    return (
        <tr>
            <td>{english}</td>
            <td>{spanish}</td>
            <td>
                <Button onClick={() => onEdit(itemId)} variant="link">Edit</Button>
                <Button onClick={() => onDelete(itemId)} variant="link">Delete</Button>
            </td>
        </tr>
    )
}
