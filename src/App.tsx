import React from 'react';
import './App.css';
// import Collator from './collator/Collator';
import Viewer from './components/Viewer/Viewer';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="App">
          <Viewer />
        </div>
      </div>);
  }
}

export default App;
