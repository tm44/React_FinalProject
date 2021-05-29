import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timeLeft: 15 }
    }

    startTimer() {
        const interval = setInterval(() => {
            if (this.state.timeLeft > 0) {
                this.setState({timeLeft: this.state.timeLeft - 1});
            }
            else {
                this.props.onTimerExpired();
                clearInterval(interval);
            }
        }, 1000);
    }

    getColor() {
        if (this.state.timeLeft < 5) {
            return 'red';
        }
        if (this.state.timeLeft < 10) {
            return 'orange';
        }
        return 'green';
    }

    render() {
        return (
            <span id="timer"
                style={{borderColor: this.getColor()}}
            >0:{this.state.timeLeft < 10 ? "0" : ""}{this.state.timeLeft}</span>
        )
    }
}

export default Timer;