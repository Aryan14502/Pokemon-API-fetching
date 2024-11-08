import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main.js';
import Pokemon from './pages/pokemon/Pokemon.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='' element={<Main />}/>
            <Route path='pokemon' element={<Pokemon />}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
