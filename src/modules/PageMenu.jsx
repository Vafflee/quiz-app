import React from "react";
import testPack from '../data/test.json';
import secondPack from '../data/second_pack.json';
import oneQuestion from '../data/one_question.json';
import bjd from '../data/Безопасность жизнедеятельности для студентов.json';

import iconX from '../img/x.svg';

class PageMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packs: [testPack, secondPack, oneQuestion, bjd],
            userPacks: localStorage.hasOwnProperty('userPacks') ?
                JSON.parse(localStorage.userPacks) : [],
            url: null,
            data: null,
            fileName: null
        }
        this.fileInputRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    choosePack(pack) {
        this.props.setData(pack);
        this.props.goToPage('start');
    }

    handleChange(event) {
        this.setState({fileName: event.target.files[0].name})
    }

    async fileToJSON(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.onload = event => resolve(JSON.parse(event.target.result))
          fileReader.onerror = error => reject(error)
          fileReader.readAsText(file)
        })
      }

    sendData() {
        if (this.state.data && this.props.validateData(this.state.data)) {
            // this.props.setData(this.state.data);
            // this.props.goToPage('start');
            const userPacks = this.state.userPacks.slice();
            userPacks.push(this.state.data);
            localStorage.userPacks = JSON.stringify(userPacks);
            this.setState({userPacks: userPacks});
        }
        else {
            alert('Ошибка чтения данных, проверьте, подходит ли структура файла требованиям');
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            if (this.fileInputRef.current.files.length <= 0) {
                throw new Error('Empty input')
            }
            if (!this.fileInputRef.current.files[0].name.endsWith('.json')) {
                throw new Error('Wrong extention')
            }
            this.fileToJSON(this.fileInputRef.current.files[0])
                .then((json) => this.setState({data: json}))
                .then(() => this.sendData());
        } catch (error) {
            console.log(error);   
        }
    }

    handleCreate() {
        this.props.goToPage('create');
    }

    handleDeletePack(title, event) {
        event.stopPropagation();
        const userPacks = this.state.userPacks.slice();
        const updatedUserPacks = userPacks.filter(pack => pack.title !== title);
        this.setState({userPacks: updatedUserPacks});
        localStorage.userPacks = JSON.stringify(updatedUserPacks);
    }

    render() {

        const packs = this.state.packs.map((pack) => {
            return (
                <button
                    key={pack.title}
                    className="menu__option button-outline"
                    onClick={() => this.choosePack(pack)}
                >
                    {pack.title}
                </button>
            );
        });

        const userPacks = this.state.userPacks.map(pack => {
            return (
                <button
                    key={pack.title}
                    className="menu__option button-outline"
                    onClick={() => this.choosePack(pack)}
                >
                    <div 
                        onClick={(event) => {this.handleDeletePack(pack.title, event)}} 
                        className="menu__option-delete"
                    ><img src={iconX}></img></div>
                    {pack.title}
                </button>
            );
        });

        const inputText = this.state.fileName ? this.state.fileName : 'Загрузить файл';

        return (
            <>
                <div className="game__title game__title_center">
                    Пожалуйста, выберите пак вопросов из списка или загрузите собственный
                </div>
                <div className="game__content menu">
                    <div className="menu__section">
                        <div className="menu__group">
                            <div className="menu__subtitle">От разработчика</div>
                            <div className="menu__options">
                                {packs}
                            </div>
                        </div>
                        <div className="menu__group">
                            {userPacks.length > 0 ? <div className="menu__subtitle">Загруженные</div> : null}
                            <div className="menu__options">
                                {userPacks}
                            </div>
                        </div>
                    </div>
                    <div className="menu__buttons">
                        <button onClick={() => this.handleCreate()} className="button menu__create">Создать пак</button>
                        <form className="menu__form" onSubmit={(event) => this.handleSubmit(event)}>
                            <label htmlFor="file-input" className="menu__input">{inputText}</label>
                            <input style={{display: 'none'}} id="file-input" type="file" accept=".json" onChange={this.handleChange} ref={this.fileInputRef}/>
                            <input className="menu__submit button" type="submit" value="Добавить"/>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default PageMenu;