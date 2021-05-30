import React, { Component } from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import Flashcard from './Flashcard';
import db from '../../firebase/db';
import Timer from './Timer';
import Score from './Score';
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from 'react-router-dom';

export default class Game extends Component {
    
    constructor(props) {
        super(props);
        this.timerRef = React.createRef();
        this.state = {
            loading: true,
            currentAnswer: {},
            currentOptions: [],
            score: 0,
            phraseList: [],
            timeLeft: 60,
            notEnoughCards: false
        }
        this.user = firebase.auth().currentUser;
        this.onCardClick = this.onCardClick.bind(this);
        this.onTimerExpired = this.onTimerExpired.bind(this);
    }

    answerIndex = -1;
    options = [];

    componentDidMount() {
        db.collection('users')
            .doc(this.user.email)
            .collection('phrases')
            .get()
            .then((data) => {
                const list = [];
                data.forEach((doc) => {
                    const item = doc.data();
                    list.push({
                        spanish: item.spanish,
                        english: item.english,
                        id: doc.id
                    });
                });
                this.setState({
                    phraseList: list,
                    notEnoughCards: !list || list.length < 3
                });
                if (list.length >= 3) {
                    this.startGame();
                }
                this.setState({
                    loading: false
                });
                if (list.length >= 3) {
                    this.timerRef.current.startTimer();
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    startGame() {
        this.setupNewQuestions();
    }

    getRandomAnswer() {
        this.answerIndex = Math.floor(Math.random() * this.state.phraseList.length);
        this.options.push(this.state.phraseList[this.answerIndex]);
        this.setState({
                currentAnswer: this.state.phraseList[this.answerIndex]
            });
    }
    
    getAnotherOption() {
        const randomIndex = Math.floor(Math.random() * this.state.phraseList.length);
        if (this.options.indexOf(this.state.phraseList[randomIndex]) > -1) {
            return this.getAnotherOption();
        }
        this.options.push(this.state.phraseList[randomIndex]);
    }

    setupNewQuestions() {
        var flashcards = document.querySelectorAll('div.card-body');
        for (let i = 0; i < flashcards.length; i++) {
            flashcards[i].style.backgroundColor = '';
        }
        this.options = [];
        this.getRandomAnswer();
        this.getAnotherOption();
        this.getAnotherOption();
        this.shuffleArray(this.options);
        this.setState({
            currentOptions: this.options
        });

    }    
    
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }   
    
    onCardClick(e, isCorrect, isAnswerCard = false){
        if (isAnswerCard) {
            return;
        }
        if (isCorrect) {
            this.setState({
                score: this.state.score + 1
            });
            setTimeout(() => {
                this.setupNewQuestions();
            }, 1000);            
        }
        e.target.closest(".card-body").style.backgroundColor = isCorrect ? 'green' : 'red';
    }

    onTimerExpired() {
        this.props.history.push({
            pathname: '/gameover',
            state: { finalScore: this.state.score }
        });
    }    

    render() {
        return (
        <Container>
            {this.state.loading && <span>Loading...</span>}
            {!this.state.loading && this.state.notEnoughCards && (
                <>
                <div className="pt-5">
                <h1>¡Ay, caramba!</h1>
                You don't have enough flashcards to play!  To play the game, make sure to <Link to="/list">create some flashcards</Link>.
                </div>
                </>
            )}
            {!this.state.loading && !this.state.notEnoughCards && (
                <>
                    <Row className="pt-4">
                <Col className="col-sm-9 text-center">
            <Timer onTimerExpired={this.onTimerExpired} ref={this.timerRef} />
            </Col>
            <Col className="col-sm-3 text-center">
                <Score score={this.state.score} />
            </Col>

        </Row>
            <Row className="pt-4">
                <Col>
                    <Flashcard
                        isCorrect={this.state.currentOptions[0].id === this.state.currentAnswer.id}
                        onCardClick={this.onCardClick} 
                        optionId={this.state.currentOptions[0].id} 
                        text={this.state.currentOptions[0].english} 
                    />
                </Col>
                
                <Col>
                    <Flashcard
                            isCorrect={this.state.currentOptions[1].id === this.state.currentAnswer.id}
                            onCardClick={this.onCardClick} 
                            optionId={this.state.currentOptions[1].id} 
                            text={this.state.currentOptions[1].english} 
                        />
                </Col>
                <Col>
                    <Flashcard
                            isCorrect={this.state.currentOptions[2].id === this.state.currentAnswer.id}
                            onCardClick={this.onCardClick} 
                            optionId={this.state.currentOptions[2].id} 
                            text={this.state.currentOptions[2].english}
                        />                
                </Col>                                        
            </Row>
            <Row className="col-sm-4 offset-sm-4 pt-5">
                <Col>
                    <Flashcard
                        text={this.state.currentAnswer.spanish}
                        onCardClick={this.onCardClick}
                        isAnswerCard={true}
                    />
                </Col>                    
            </Row>
            </>
            )}

        </Container>
        )
    }
}
