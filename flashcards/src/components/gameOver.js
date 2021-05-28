import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class gameOver extends Component {
    render() {
        return (
            <div>
                Game Over!<br />
                <Link to="/game">Play again</Link><br />
                <Link to="/list">Manage list</Link>
            </div>
        )
    }
}
