import React from 'react';
import ReactDOM from 'react-dom';
import Game from './modules/Game.jsx';

import './scss/main.scss';

class App extends React.Component {
  constructor() {
    super();

    let records;
    try {
      records = JSON.parse(localStorage.records) ?? {};
    } catch {
      records = {};
    }
    
    this.state = {
      data: null,
      page: 'menu',
      player: '',
      records: records
    };

    // console.log(this.state.records);
  }

  setData(data) {
    this.setState({data: data});
  }

  goToPage(page) {
    this.setState({page: page});
  }

  setName(name) {
    this.setState({player: name});
  }

  addRecord(name, pack, score) {
    const record = {name: name, pack: pack, score: score};
    // console.log(record);

    const records = this.state.records;
    if (records.hasOwnProperty(pack) && Array.isArray(records[pack])) {
      records[pack].push(record);
    }
    else {
      records[pack] = [record];
    }

    this.setState({records: records});
    localStorage.records = JSON.stringify(records);
  }

  render() {
    return (
      <div className="page-container">
      <header className="header">
        <div className="header__content">
          <div className="header__title">Vafflee's quiz app</div>
        </div>
      </header>
      <div className="main">
        <div className="main__container">
          <Game
            player={this.state.player}
            page={this.state.page}
            data={this.state.data}
            records={this.state.records}
            addRecord={(name, pack, score) => this.addRecord(name, pack, score)}
            goToPage={(page) => this.goToPage(page)}
            setName={(name) => this.setName(name)}
            setData={(data) => this.setData(data)}
          />
        </div>
      </div>
      <footer className="footer">
        <div className="footer__content">Programmed by Tarasov Daniil</div>
      </footer>
    </div>
    );
  }
}

  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  