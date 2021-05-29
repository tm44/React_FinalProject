import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timeLeft: 1000 }
    }

    componentDidMount() {
        this.setState({
            timeLeft: 1000
        });
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

    render() {
        return (
            <span id="timer" style={{borderColor: "green"}}>0:{this.state.timeLeft}</span>
        )
    }
}

export default Timer;