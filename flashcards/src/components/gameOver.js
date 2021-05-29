import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, location } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function GameOver() {
    const { location } = useHistory();
    const { currentUser } = useAuth();
    const history = useHistory();

    return (
        <Container className="pt-3">
            <h1>Game Over!</h1>
            <h3>Final score: <strong>{location.state.finalScore}</strong></h3>
            <br /><br />
            <Button onClick={() => history.push('/game')}>Play again</Button><br /><br />
            <Button onClick={() => history.push('/list')}>Manage your flashcard list</Button>
        </Container>
    )
}
