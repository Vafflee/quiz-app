import React from "react";
import PageStart from './PageStart.jsx';
import PagePlay from './PagePlay.jsx';
import PageEnd from "./PageEnd.jsx";
import PageMenu from "./PageMenu.jsx";
import PageCreate from "./PageCreate.jsx";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
        };
        this.pages = [];
        this.currentPage = null;
    }

    increaseScore() {
        this.setState({score: this.state.score + 1});
    }

    clearScore() {
        this.setState({score: 0});
    }

    validateData(data) {
        if (!(data.title && data.title !== '')) return false;
        if (!(data.startText && data.startText !== '')) return false;
        if (!(data.endText && data.endText !== '')) return false;
        if (!(data.questions && data.questions !== '')) return false;
        if (!Array.isArray(data.questions)) return false;
        if (!(data.questions.length > 0)) return false;
        let valide = true;
        data.questions.forEach(q => {
            if (!(q.id && q.id !== '')) valide = false;
            if (!(q.text && q.text !== "")) valide = false;
            if (!(q.rightAnswer && q.rightAnswer !== '')) valide = false;
            if (!(q.wrongAnswers && q.wrongAnswers !== '')) valide = false;
            if (!Array.isArray(q.wrongAnswers)) valide = false;
            if (!(q.wrongAnswers.length > 0)) valide = false;
            q.wrongAnswers.forEach(ans => {
                if (!(ans && ans !== '')) valide = false;
            });
        });
        return valide;
    }
    
    render() {
        switch (this.props.page) {
            case 'start':
                this.currentPage = 
                    <PageStart 
                        title={this.props.data.title} 
                        text={this.props.data.startText}
                        goToPage={(page) => this.props.goToPage(page)}
                        setName={(name) => this.props.setName(name)}
                    />;
                break;
            case 'play':
                this.currentPage = 
                    <PagePlay 
                        questions={this.props.data.questions}
                        score={this.state.score}
                        onRightAnswer={() => this.increaseScore()}
                        goToPage={(page) => this.props.goToPage(page)}
                        addRecord={() => this.props.addRecord(this.props.player, this.props.data.title, this.state.score)}
                    />;
                break;
            case 'end':
                this.currentPage = 
                    <PageEnd 
                        title={this.props.data.title} 
                        text={this.props.data.endText}
                        score={this.state.score}
                        records={this.props.records}
                        goToPage={(page) => this.props.goToPage(page)}
                        clearScore={() => this.clearScore()}
                    />;
                break;
            case 'menu':
                this.currentPage =
                    <PageMenu
                        setData={(data) => this.props.setData(data)}
                        validateData={(data) => this.validateData(data)}
                        goToPage={(page) => this.props.goToPage(page)}
                    />;
                break;
            case 'create':
                this.currentPage =
                    <PageCreate
                        setData={(data) => this.props.setData(data)}
                        validateData={(data) => this.validateData(data)}
                        goToPage={(page) => this.props.goToPage(page)}
                    />;
                break;
            default:
                this.currentPage = null;
        }

        return (
            <div className="game">
                {this.currentPage}
            </div>
        );
    }
}

export default Game;