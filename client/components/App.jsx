import React, { Component } from 'react';
import Noteboard from './Noteboard.jsx';


class App extends Component {

  render() { 
    return (
      <div className="outer-container">
        {/* <h1>gp's amazing ideas</h1> */}
        <div className="inner-container">
          <div>
            <Noteboard />
          </div>
        </div>
      </div>
    );
  }
}



export default App;