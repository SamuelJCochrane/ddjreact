import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import './App.css';

//COMPONENTS
import { TimetablePage } from './TimetablePage/TimetablePage';
import { Navbar } from './Navbar/Navbar';

class App extends Component {

  constructor(props) {
    super(props)

  }

 
  render() {
    return (
      <div>
        <Navbar/>
        <TimetablePage/>
      </div>
    );
  }
}

export default App;
