import React from 'react';
import './App.css';
// import Collator from './collator/Collator';
import Viewer from './components/Viewer/Viewer';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">         
          {/* <Collator/> */}
        </header>
        <div className="App">
          <Viewer />
        </div>
      </div>);
  }
}

export default App;
