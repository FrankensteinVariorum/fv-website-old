import React from 'react';
import './App.css';
// import Collator from './collator/Collator';
import Viewer from './components/Viewer/Viewer';
import './styles/sass/style.sass';

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
