import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import './App.css';

//COMPONENTS
import { TimetablePage } from './timetable/TimetablePage/TimetablePage';
import { Navbar } from './timetable/Navbar/Navbar';

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
