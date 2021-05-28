import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {Container, Row, Col } from 'react-bootstrap';
import Flashcard from './game/Flashcard';
import db from '../firebase/db';
import { useAuth } from '../contexts/AuthContext';
import Timer from './game/Timer';

export default function Game() {
    const history = useHistory();
    const timerRef = useRef(null);
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [currentRound, setCurrentRound] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState({});
    const [currentOptions, setCurrentOptions] = useState([]);
    //const [timeLeft, setTimeLeft] = useState(30);
    let answerIndex = -1;
    let options = [];
    const list = [];

    useEffect(() => {
        console.log('use effect is running');
        const unregisterAuthObserver = db.collection('users')
            .doc(currentUser.email)
            .collection('phrases')
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    const item = doc.data();
                    list.push({
                        spanish: item.spanish,
                        english: item.english,
                        id: doc.id
                    });
                });
                startGame();
                setLoading(false);
                timerRef.current.startTimer();
            })
            .catch((e) => {
                console.log(e);
            });

        return unregisterAuthObserver;
    }, []);

    function startGame() {
        setupNewQuestions();
    }

    function getRandomAnswer() {
        answerIndex = Math.floor(Math.random() * list.length);
        options.push(list[answerIndex]);
        setCurrentAnswer(list[answerIndex]);
    }
    
    function getAnotherOption() {
        const randomIndex = Math.floor(Math.random() * list.length);
        if (options.indexOf(list[randomIndex]) > -1) {
            return getAnotherOption();
        }
        options.push(list[randomIndex]);
    }

    function setupNewQuestions() {
        setCurrentRound(currentRound + 1);

        getRandomAnswer();
        getAnotherOption();
        getAnotherOption();
        shuffleArray(options);
        setCurrentOptions(options);
        console.log('answer is ' + list[answerIndex].english);
        console.log('displayed options are:');
        console.log(options);
    }    
    
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function onCardClick(answerId){
        if (answerId === currentAnswer.id)
            console.log('Correct!');
        else
            console.log('Wrong');
    }

    function onTimerExpired() {
        console.log('Game over!');
        history.push('/gameover');
    }

    return (
        <Container>
            {loading && <span>Loading...</span>}
            {!loading && (
                <>
                    <Row className="pt-4">
                <Col className="col-sm-9 text-center">
            <Timer onTimerExpired={onTimerExpired} ref={timerRef} />
            </Col>
            <Col className="col-sm-3 text-center">
            Current score: <span id="current-score">0</span> / <span id="questions-asked">0</span>
            </Col>

        </Row>
            <Row className="pt-4">
                <Col>
                    <Flashcard onCardClick={onCardClick} optionId={currentOptions[0].id} text={currentOptions[0].english} />
                </Col>
                <Col>
                    <Flashcard onCardClick={onCardClick} optionId={currentOptions[1].id} text={currentOptions[1].english} />
                </Col>
                <Col>
                    <Flashcard onCardClick={onCardClick} optionId={currentOptions[2].id} text={currentOptions[2].english} />
                </Col>                                        
            </Row>
            <Row className="col-sm-4 offset-sm-4 pt-5">
                <Col>
                    <Flashcard text={currentAnswer.spanish} />
                </Col>                    
            </Row>
            </>
            )}

        </Container>
    )
}
