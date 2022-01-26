import React from "react";
import TextareaAutoresize from 'react-textarea-autosize';
import iconPlus from '../img/plus.svg';
import iconX from '../img/x.svg';

class PageCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            startText: '',
            endText: '',
            questions: [
                {
                    id: 1,
                    text: '',
                    rightAnswer: '',
                    wrongAnswers: [
                        ''
                    ]
                }
            ]
        };

        this.handleChangeInfo = this.handleChangeInfo.bind(this);
        this.handleChangeWrong = this.handleChangeWrong.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    }

    handleChangeInfo(event, field) {
        this.setState({
            [field]: event.target.value
        });
    }

    handleChangeQuestion(event, qIndex, value) {
        const questions = this.state.questions.slice();
        questions[qIndex][value] = event.target.value;
        this.setState({questions: questions});
    }

    handleChangeWrong(event, qIndex, wIndex) {
        const questions = this.state.questions.slice();
        questions[qIndex].wrongAnswers[wIndex] = event.target.value;
        this.setState({questions: questions});
    }

    handleDeleteQuestion(qIndex) {
        const questions = this.state.questions.slice();
        questions.splice(qIndex, 1);
        this.setState({
            questions: questions
        });
    }

    handleDeleteWrong(qIndex, wIndex) {
        const questions = this.state.questions.slice();
        questions[qIndex].wrongAnswers.splice(wIndex, 1);
        this.setState({
            questions: questions
        })
    }

    handleAddQuestion() {
        const questions = this.state.questions.slice();
        questions.push({id: questions.length > 0 ? questions[questions.length-1].id + 1 : 1, text: '', rightAnswer: '', wrongAnswers: []});
        this.setState({questions: questions});
    }

    handleAddWrong(qIndex) {
        const questions = this.state.questions.slice();
        questions[qIndex].wrongAnswers.push('');
        this.setState({questions: questions});
    }

    handleStart() {
        if (this.state && this.props.validateData(this.state)) {
            this.props.setData(this.state);
            this.props.goToPage('start');
        }
        else {
            alert('Пожалуйста, заполните все необходимые поля');
        }
    }

    handleDownload() {
        if (this.state && this.props.validateData(this.state)) {
            const filename = this.state.title + '.json';
            const text = JSON.stringify(this.state);
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
        else {
            alert('Пожалуйста, заполните все необходимые поля');
        }
    }

    handleExit() {
        this.props.goToPage('menu');
    }

    render() {

        const questions = this.state.questions.map((q, qIndex) => {

            const wrong = q.wrongAnswers.map((w, wIndex) => {
                return(
                    <div key={wIndex} className="wrong-answer-edit">
                        <TextareaAutoresize onChange={event => this.handleChangeWrong(event, qIndex, wIndex)} value={w} className="wrong-answer-edit__text textarea" placeholder="Ответ" />
                        <button onClick={() => this.handleDeleteWrong(qIndex, wIndex)} className="wrong-answer-edit__delete-answer">
                            <img alt='icon' src={iconX}></img>
                        </button>
                    </div>
                );
            });

            return(
                <div key={q.id} className="create__question question-edit">
                            <button onClick={() => this.handleDeleteQuestion(qIndex)} className="question-edit__delete">
                                <img alt='icon' src={iconX}></img>
                            </button>
                            <div className="create__text">
                                <label className="create__text-label" htmlFor="q-text">Текст вопроса</label>
                                <TextareaAutoresize onChange={event => this.handleChangeQuestion(event, qIndex, 'text')} value={q.text} id="q-text" className="create__text-input textarea" placeholder="Текст" />
                            </div>
                            <div className="create__text">
                                <label className="create__text-label" htmlFor="title">Правильный ответ</label>
                                <input onChange={event => this.handleChangeQuestion(event, qIndex, 'rightAnswer')} value={q.rightAnswer} id="title" className="create__text-input text-input" type="text" placeholder="Ответ"></input>
                            </div>
                            <div className="question-edit__wrong-title">
                                Неверные ответы
                                <button onClick={() => this.handleAddWrong(qIndex)} className="question-edit__add-wrong">
                                    <img alt='icon' src={iconPlus}></img>
                                </button>
                            </div>
                            <div className="question-edit__wrong">
                                {wrong}
                            </div>
                        </div>
            );
        });

        return (
            <>
                <div className="game__title game__title_center">
                    Общая информация
                </div>
                <div className="game__content create">
                    <div className="create__info">
                        <div className="create__text">
                            <label className="create__text-label" htmlFor="title">Название теста</label>
                            <input value={this.state.title} onChange={(event) => this.handleChangeInfo(event, 'title')} id="title" className="create__text-input text-input" type="text" placeholder="Название"></input>
                        </div>
                        <div className="create__text">
                            <label className="create__text-label" htmlFor="start-text">Текст в начале</label>
                            <TextareaAutoresize value={this.state.startText} onChange={(event) => this.handleChangeInfo(event, 'startText')} id="start-text" className="create__text-input textarea" placeholder="Текст" />
                        </div>
                        <div className="create__text">
                            <label className="create__text-label" htmlFor="end-text">Текст в конце</label>
                            <TextareaAutoresize value={this.state.endText} onChange={(event) => this.handleChangeInfo(event, 'endText')} id="end-text" className="create__text-input textarea" placeholder="Текст" />
                        </div>
                    </div>
                    <div className="game__title game__title_center">
                        Вопросы
                    </div>
                    <div className="create__questions">
                        {questions}
                    </div>
                    <button onClick={() => this.handleAddQuestion()} className="create__add-question button">+</button>
                    <div className="create__buttons">
                        <button onClick={() => this.handleExit()} className="create__exit button">Выйти</button>
                        <button onClick={() => this.handleDownload()} className="create__download button-outline">Скачать json файл</button>
                        <button onClick={() => this.handleStart()} className="create__start button">Начать игру</button>
                    </div>
                    <p className="create__requirements">Все поля должны быть заполнены, а также пак должен иметь хотя бы один вопрос, и каждый вопрос должен иметь хотя бы один неверный ответ.</p>
                </div>
            </>
        )
    }
}

export default PageCreate;