import React from "react";

class Loading extends React.Component {
    render() {
        return (
            <div className="game__loading">
                <div className="game__loading-bar" style={ {width: this.props.width + '%'} }></div>
            </div>
        )
    }
}

class PagePlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions.sort((a, b) => (Math.random() > .5) ? 1 : -1),
            currentQuestion: 0,
            answered: false,
            clickedAnswer: null,
            loadingWidth: 0,
            answers: null,
        };
        this.state.answers = [...this.state.questions[0].wrongAnswers, this.state.questions[0].rightAnswer].sort((a, b) => Math.random() > .5 ? 1 : -1);
    }

    handleClick(ans, key) {
        if (this.state.answered) return;
        if (this.checkAnswer(ans)) {
            this.props.onRightAnswer();
        }
        this.setState({answered: true, clickedAnswer: key});
        const timeToLoad = 2000;
        const tickTime = 10;
        const loading = setInterval(() => {this.setState({loadingWidth: this.state.loadingWidth + 100/(timeToLoad/tickTime)})}, tickTime);
        setTimeout(() => {clearInterval(loading); this.moveNext()}, timeToLoad);
    }

    checkAnswer(ans) {
        return ans === this.state.questions[this.state.currentQuestion].rightAnswer;
    }

    moveNext() {
        if (this.state.currentQuestion >= this.state.questions.length - 1) {
            this.props.addRecord();
            this.props.goToPage('end');
        }
        else {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1,
                answered: false,
                clickedAnswer: null,
                loadingWidth: 0,
                answers: [...this.state.questions[this.state.currentQuestion + 1].wrongAnswers, this.state.questions[this.state.currentQuestion + 1].rightAnswer].sort((a, b) => Math.random() > .5 ? 1 : -1)
            });
        }
    }

    render() {
        const question = this.state.questions[this.state.currentQuestion];
        const answers = (this.state.answers).map((ans, key) => {
            return(
                <button
                    key={key}
                    onClick={() => this.handleClick(ans, key)}
                    className={
                        'question__answer button-outline ' + 
                        ((this.state.answered && this.checkAnswer(ans)) ? 
                        'question__answer-right' : 
                            (this.state.clickedAnswer === key ? 'question__answer-wrong' : ''))
                    }
                >{ans}</button>
            );
        });
        
        return (
            <>
                <div className="game__title">
                    <div className="game__score">{'Score: '}<span className="game__score-span">{this.props.score}</span></div>
                        <Loading width={this.state.loadingWidth} />
                    <div className="game__q-number">
                        {`Question ${this.state.currentQuestion + 1} of ${this.state.questions.length}`}
                    </div>
                </div>
                <div className="game__content question">
                    <div className="question__text">
                        {question.text}
                    </div>
                    <div className="question__answers">
                        {answers}
                    </div>
                </div>
            </>
        );
    }
}

export default PagePlay;