import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './Login.jsx'
import SuccessMessage from './SuccessMessage.jsx'



class App extends Component {
    state = {
        complete: false,
        firstName: '',
        starWars: {}
    }

    handleSubmit = e => {
       e.preventDefault()
        if (document.cookie.includes('JWT')) {
            this.setState({complete: true})
        }
        document.cookie = `firstName=${this.state.firstName}`
        throw new Error('Whoops!')
    }
    handleInput = e => {
        this.setState({
            firstName: e.currentTarget.value
        })
    }

    async componentDidMount() {
        const data = await fetch('https://swapi.co/api/people/1/').then(response => response.json())
        this.setState({starWars: data})
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 data-testid="h1" className="App-title">
                        Welcome to React
                    </h1>
                    <nav data-testid="navbar" className="navbar">
                        <ul>
                            <li data-testid="navBarLi" className="nav-li">
                                <a href="http://localhost:3000/">Home</a>
                            </li>
                            <li data-testid="navBarLi" className="nav-li">
                                <a href="http://localhost:3000/">About</a>
                            </li>
                            <li data-testid="navBarLi" className="nav-li">
                                <a href="http://localhost:3000/">Skills</a>
                            </li>
                            <li data-testid="navBarLi" className="nav-li">
                                <a href="http://localhost:3000/">Works</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <h3 data-testid="starWars">{this.state.starWars.url ? 'Received StarWars data!' : 'Something went wrong'}</h3>
                { this.state.complete ?
                    <SuccessMessage />
                     :
                    <Login submit={this.handleSubmit} input={this.handleInput} />
                }
            </div>
        );
    }
}

export default App;
