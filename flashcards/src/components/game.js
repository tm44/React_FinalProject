// import React, { useEffect, useState, useRef } from 'react';
// import { useHistory } from 'react-router-dom';
// import {Container, Row, Col } from 'react-bootstrap';
// import Flashcard from './game/Flashcard';
// import db from '../firebase/db';
// import { useAuth } from '../contexts/AuthContext';
// import Timer from './game/Timer';
// import Score from './game/Score';

// export default function Game() {
//     const history = useHistory();
//     let timerRef = useRef();
//     const { currentUser } = useAuth();
//     const [loading, setLoading] = useState(true);
//     const [currentAnswer, setCurrentAnswer] = useState({});
//     const [currentOptions, setCurrentOptions] = useState([]);
//     const [score, setScore] = useState(0);
//     const [phraseList, setPhraseList] = useState(null);
//     //const [timeLeft, setTimeLeft] = useState(30);
//     let answerIndex = -1;
//     let options = [];
//     console.log('starting function');

//     useEffect(() => {
//         console.log('useEffect called');
//         let unregisterAuthObserver;
//         if (!phraseList) {
//             unregisterAuthObserver = db.collection('users')
//                 .doc(currentUser.email)
//                 .collection('phrases')
//                 .get()
//                 .then((data) => {
//                     const list = [];
//                     data.forEach((doc) => {
//                         const item = doc.data();
//                         list.push({
//                             spanish: item.spanish,
//                             english: item.english,
//                             id: doc.id
//                         });
//                     });
//                     setPhraseList(list);
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                 });
//         }
//         else {
//             //debugger;
//             setLoading(false);
//             startGame();
//             //debugger;
//             //timerRef.current.startTimer();
//         }

//         return unregisterAuthObserver;
//     }, [phraseList]);

//     function startGame() {
//         setupNewQuestions();
//     }

//     function getRandomAnswer() {
//         answerIndex = Math.floor(Math.random() * phraseList.length);
//         options.push(phraseList[answerIndex]);
//         setCurrentAnswer(phraseList[answerIndex]);
//     }
    
//     function getAnotherOption() {
//         //debugger;
//         const randomIndex = Math.floor(Math.random() * phraseList.length);
//         if (options.indexOf(phraseList[randomIndex]) > -1) {
//             return getAnotherOption();
//         }
//         options.push(phraseList[randomIndex]);
//     }

//     function setupNewQuestions() {
//         options = [];
//         getRandomAnswer();
//         //setCurrentOptions([]);
//         getAnotherOption();
//         getAnotherOption();
//         shuffleArray(options);
//         setCurrentOptions(options);
//     }    
    
//     function shuffleArray(arr) {
//         for (let i = arr.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [arr[i], arr[j]] = [arr[j], arr[i]];
//         }
//     }

//     function onCardClick(answerId){
//         if (answerId === currentAnswer.id) {
//             setScore(score + 1);
//             setTimeout(() => {
//                 //document.querySelectorAll("div.selection>div").forEach(card => { card.style.backgroundColor = ""; });
//                 setLoading(true);
//                 setupNewQuestions();

//                 setLoading(false);
//             }, 1000);            
//         }
//         else
//             console.log('Wrong');
//     }

//     function onTimerExpired() {
//         console.log('Game over!');
//         history.push('/gameover');
//     }

//     return (
//         <Container>
//             {loading && <span>Loading...</span>}
//             {!loading && (
//                 <>
//                     <Row className="pt-4">
//                 <Col className="col-sm-9 text-center">
//             <Timer onTimerExpired={onTimerExpired} ref={timerRef} />
//             </Col>
//             <Col className="col-sm-3 text-center">
//                 <Score score={score} />
//             </Col>

//         </Row>
//             <Row className="pt-4">
//                 <Col>
//                     <Flashcard onCardClick={onCardClick} optionId={currentOptions[0].id} text={currentOptions[0].english} />
//                 </Col>
//                 <Col>
//                     <Flashcard onCardClick={onCardClick} optionId={currentOptions[1].id} text={currentOptions[1].english} />
//                 </Col>
//                 <Col>
//                     <Flashcard onCardClick={onCardClick} optionId={currentOptions[2].id} text={currentOptions[2].english} />
//                 </Col>                                        
//             </Row>
//             <Row className="col-sm-4 offset-sm-4 pt-5">
//                 <Col>
//                     <Flashcard text={currentAnswer.spanish} />
//                 </Col>                    
//             </Row>
//             </>
//             )}

//         </Container>
//     )
// }
import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import {Container, Row, Col } from 'react-bootstrap';
import Flashcard from './game/Flashcard';
import db from '../firebase/db';
import { useAuth } from '../contexts/AuthContext';
import Timer from './game/Timer';
import Score from './game/Score';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentAnswer: {},
            currentOptions: [],
            score: 0,
            phraseList: [],
            timeLeft: 60
        }
        this.onCardClick = this.onCardClick.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     //return false;
    // }

    //currentUser = useAuth();
    answerIndex = -1;
    options = [];

    componentDidMount() {
        console.log('componentDiddMount');
        if (!this.state.phraseList || this.state.phraseList.length === 0) {
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
                    })
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        else {
            //debugger;
            this.setState({ loading: false })
            this.startGame();
            //debugger;
            //timerRef.current.startTimer();
        }

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
        //debugger;
        const randomIndex = Math.floor(Math.random() * this.state.phraseList.length);
        if (this.options.indexOf(this.state.phraseList[randomIndex]) > -1) {
            return this.getAnotherOption();
        }
        this.options.push(this.state.phraseList[randomIndex]);
    }

    setupNewQuestions() {
        this.options = [];
        this.getRandomAnswer();
        //setCurrentOptions([]);
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
    
    onCardClick(answerId){
        if (answerId === this.state.currentAnswer.id) {
            this.setState({
                score: this.state.score + 1
            });
            setTimeout(() => {
                //document.querySelectorAll("div.selection>div").forEach(card => { card.style.backgroundColor = ""; });
                this.setState({
                    loading: true
                });
                this.setupNewQuestions();

                this.setState({
                    loading: false
                });
            }, 1000);            
        }
        else
            console.log('Wrong');
    }

    onTimerExpired() {
        console.log('Game over!');
        //this.histohistory.push('/gameover');
    }    

    render() {
        return (
        <Container>
            {this.state.loading && <span>Loading...</span>}
            {!this.state.loading && (
                <>
                    <Row className="pt-4">
                <Col className="col-sm-9 text-center">
            {/* <Timer onTimerExpired={this.onTimerExpired} ref={timerRef} /> */}
            </Col>
            <Col className="col-sm-3 text-center">
                <Score score={this.state.score} />
            </Col>

        </Row>
            <Row className="pt-4">
                <Col>
                    <Flashcard onCardClick={this.onCardClick} optionId={this.state.currentOptions[0].id} text={this.state.currentOptions[0].english} />
                </Col>
                <Col>
                    <Flashcard onCardClick={this.onCardClick} optionId={this.state.currentOptions[1].id} text={this.state.currentOptions[1].english} />
                </Col>
                <Col>
                    <Flashcard onCardClick={this.onCardClick} optionId={this.state.currentOptions[2].id} text={this.state.currentOptions[2].english} />
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
