import React from 'react';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

export default function Scoreboard({scores}) {
    return (
        <>
        {(!scores || scores.length === 0) && (
            <span>No scores recorded yet.</span>
        )}
        {scores && scores.length > 0 && (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map(s => {
                        return (
                            <tr key={s.id}>
                                <td>{s.score}</td>
                                <td>
                                    <Moment format="M/D/YY h:mm:ss A">{s.createDate}</Moment>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
        </>
    )
}
