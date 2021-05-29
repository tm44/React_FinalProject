import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, location } from 'react-router-dom';

export default function GameOver() {
    const { location } = useHistory();
    const { currentUser } = useAuth();
    return (
        <div>
            Game Over, {currentUser.email}!<br />
            Final score: {location.state.finalScore}<br />
            <Link to="/game">Play again</Link><br />
            <Link to="/list">Manage list</Link>
        </div>
    )
}
