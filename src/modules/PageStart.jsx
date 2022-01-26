import React from "react";

class PageStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            erroe: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateName(this.state.value)) {
            this.props.setName(this.state.value);
            this.props.goToPage('play');
        }
        else {
            this.setState({error: 'Пожалуйста, введите имя'});
        }
    }

    validateName(name) {
        return name ? true : false;
    }

    render() {
        return (
            <>
                <div className="game__title game__title_center">
                    {this.props.title}
                </div>
                <div className="game__content start">
                    <div className="start__text">
                        {this.props.text}
                    </div>
                </div>
                <div className='start__error'>
                    {this.state.error}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className='start__input text-input' onChange={this.handleChange} placeholder='Ваше имя' />
                    <input type='submit' className="start__button button" value='Start' />
                </form>
            </>
        );
    }
}

export default PageStart;