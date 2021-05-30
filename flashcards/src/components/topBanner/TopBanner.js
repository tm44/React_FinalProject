import React from 'react';
import WeatherContainer from './WeatherContainer';
import LogOut from './LogOut';
import CurrentUser from './CurrentUser';
import {Container, Row, Col} from 'react-bootstrap';

export default function TopBanner() {

    return (
        <>
        <Container className="row-red"></Container>
        <Container className="container text-black row-yellow pt1">
            <Row>
                <Col xs={12} md={8}>
                    <h1>Spanish Flashcards</h1>
                    <p className="text-yellow mb-2">The greatest flashcard game you will ever play.  Well, kind of.</p>
                    <CurrentUser /><br />
                    <LogOut />
                </Col>
                <Col xs={12} md={4}>
                    <WeatherContainer />
                </Col>

            </Row>
        </Container>
        <Container className="row-red"></Container>
        </>
    )
}
