import React from 'react';
import logo from './logo.jpg';
import './App.css';
import Collator from './collator/Collator';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hump? What hump?
          </p>
          <Collator/>
        </header>
      </div>);
  }
}

export default App;
