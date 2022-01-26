import React from "react";

class PageEnd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {records: this.props.records};
    }

    handleRestart() {
        this.props.clearScore();
        this.props.goToPage('start');
    }

    handleExit() {
        this.props.clearScore();
        this.props.goToPage('menu');
    }

    handleClearRecords() {
        const records = this.state.records;
        records[this.props.title] = [];
        this.setState(records);
        localStorage.records = JSON.stringify(records);
    }

    render() {
        const records = this.state.records[this.props.title].map((record, index) => {
            return (
                <div key={index} className="end__record">
                    <div className="end__name">{record.name}</div>
                    <div className="end__record-score">{record.score}</div>
                </div>
            );
        });

        return (
            <>
                <div className="game__title">
                    <div className="game__score">{this.props.title}</div>
                    <div className="game__score">Ваш результат:<span className="end__score-span">{this.props.score}</span></div>
                </div>
                <div className="game__content end">
                    <div className="end__text">{this.props.text}</div>
                    <div className="end__records">
                        <div className="end__table-head">
                            <div className="end__table-name">Имя</div>
                            <div className="end__table-score">Счет</div>
                        </div>
                        {records}
                    </div>
                    <div className="end__buttons">
                        <button onClick={() => this.handleClearRecords()} className="end__clear button-outline">Очистить рекорды</button>
                        <button onClick={() => this.handleRestart()} className="end__replay button-outline">Переиграть</button>
                        <button onClick={() => this.handleExit()} className="end__exit button">Закончить</button>
                    </div>
                </div>
            </>
        );
    }
}

export default PageEnd;