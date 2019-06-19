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
        <body className="App">
          <Viewer />
        </body>
      </div>);
  }
}

export default App;
