import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import db from '../firebase/db';
import Scoreboard from './game/Scoreboard';

export default function GameOver() {
    const { location } = useHistory();
    const { currentUser } = useAuth();
    const history = useHistory();
    const [scoreList, setScoreList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = db.collection('users')
        .doc(currentUser.email)
        .collection('scores')
        .orderBy('createDate', 'desc')
        .onSnapshot((data) => {
            const scores = data.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setScoreList(scores);
            setLoading(false);
        });

        db.collection('users')
                .doc(currentUser.email)
                .collection('scores')
                .add({
                    score: location.state.finalScore,
                    createDate: new Date()
                })
                .catch((e) => {
                    console.log('an error occurred:');
                    console.log(e);
                });        

        return unregisterAuthObserver;
    },[]);

    return (
        <Container className="pt-3">
            <Row>
                <Col className="col-sm-9 text-center">
                    <h1>Game Over!</h1>
                    <h3>Final score: <strong>{location.state.finalScore}</strong></h3>
                    <br /><br />
                    <Button onClick={() => history.push('/game')}>Play again</Button><br /><br />
                    <Button onClick={() => history.push('/list')}>Manage your flashcard list</Button>
                </Col>
                <Col className="col-sm-3">
                    <Scoreboard scores={scoreList} />
                </Col>
            </Row>
        </Container>
    )
}
