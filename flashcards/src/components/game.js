import React, { Component } from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import Flashcard from './game/Flashcard';
import db from '../firebase/db';
import { useAuth } from '../contexts/AuthContext';
import Timer from './game/Timer';
import Score from './game/Score';

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
            timeLeft: 60
        }
        this.onCardClick = this.onCardClick.bind(this);
        this.onTimerExpired = this.onTimerExpired.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //return false;
    // }

    //currentUser = useAuth();
    answerIndex = -1;
    options = [];

    componentDidMount() {
        console.log('componentDiddMount');
        //if (!this.state.phraseList || this.state.phraseList.length === 0) {
            db.collection('users')
                .doc('m@t.com') // TODO: Fix!
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
                        phraseList: list
                    });
                    this.startGame();
                    this.setState({
                        loading: false
                    });
                    this.timerRef.current.startTimer();
                })
                .catch((e) => {
                    console.log(e);
                });
        // }
        // else {
        //     this.setState({ loading: false })
        //     this.startGame();
        // }

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
    
    onCardClick(e, isCorrect){
        if (isCorrect) {
            this.setState({
                score: this.state.score + 1
            });
            setTimeout(() => {
                this.setupNewQuestions();
            }, 1000);            
        }
        e.target.style.backgroundColor = isCorrect ? 'green' : 'red';
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
            {!this.state.loading && (
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
                    <Flashcard text={this.state.currentAnswer.spanish} />
                </Col>                    
            </Row>
            </>
            )}

        </Container>
        )
    }
}
