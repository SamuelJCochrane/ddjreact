import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import './App.css';

//COMPONENTS
import { TimetablePage } from './TimetablePage/TimetablePage';

class App extends Component {

  constructor(props) {
    super(props)

  }

 
  render() {
    return (
      <TimetablePage/>
    );
  }
}

export default App;
