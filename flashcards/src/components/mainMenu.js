import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function MainMenu() {
    const history = useHistory();

    return (
        <Container className="pt-4 text-center">
            <Button onClick={() => history.push('/list')}>Manage your flashcard list</Button><br /><br />
            <Button onClick={() => history.push('/game')}>Play again</Button>
        </Container>
    )
}
