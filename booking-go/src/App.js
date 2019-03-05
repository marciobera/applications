import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="form">
            <form>
              <h2 className="title">Let’s find your ideal car</h2>
              <label htmlFor="search" title="Pick Up Location">Pick-up Location</label>
              <input id="search" type="text" placeholder="city, airport, station, region, district..." />
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
