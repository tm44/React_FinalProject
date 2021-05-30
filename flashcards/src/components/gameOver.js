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
        db.collection('users')
                .doc(currentUser.email)
                .collection('scores')
                .add({
                    score: location.state.finalScore,
                    createDate: new Date()
                })
                .then(() => showScores())
                .catch((e) => {
                    console.log('an error occurred:');
                    console.log(e);
                });        

        //return unregisterAuthObserver;
    },[]);

    function showScores() {
        db.collection('users')
        .doc(currentUser.email)
        .collection('scores')
        .orderBy('createDate', 'desc')
        .onSnapshot((data) =>  {
            const scores = data.docs.map(doc => {
                return {
                    id: doc.id,
                    createDate: new Date(doc.data().createDate.seconds * 1000 + doc.data().createDate.nanoseconds/1000000),
                    score: doc.data().score
                }
            });
            setScoreList(scores);
            setLoading(false);
        });        
    }

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
                    {!loading && <Scoreboard scores={scoreList} />}
                </Col>
            </Row>
        </Container>
    )
}
