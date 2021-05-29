import React from 'react';
import { Table } from 'react-bootstrap';

export default function Scoreboard({scores}) {
    return (
        <>
        {(!scores || scores.length === 0) && (
            <span>No scores recorded yet.</span>
        )}
        {scores && scores.length > 0 && (
            <Table>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map(s => {
                        return (
                            <tr>
                                <td>{s.score}</td>
                                <td>{s.createDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
        </>
    )
}
