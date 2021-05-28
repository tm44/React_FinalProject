import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class mainMenu extends Component {
    render() {
        return (
            <div>
                <Link to="/list">Manage your list</Link><br />
                <Link to="/game">Play the game</Link>
            </div>
        )
    }
}
