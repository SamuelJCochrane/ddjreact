import React, { Component } from 'react';
import './App.css';
import { Hour } from './Hour.js';
import { Carousel } from './Carousel.js';
import { TimetableClass } from './timetable-class.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedEmployee: null,
      employees: [
        {name: 'John', _id: '1'},
        {name: 'Jack', _id: '2'},
        {name: 'Jacob', _id: '3'},
        {name: 'Jane', _id: '4'},
        {name: 'Jill', _id: '5'},
        {name: 'Janus', _id: '6'},
        {name: 'Jort', _id: '7'},
      ],
      hour: {
        employees: 
          [
            {name: 'John', _id: '1'},
            {name: 'Jack', _id: '2'},
            {name: 'Jacob', _id: '3'},
            {name: 'Jane', _id: '4'}
          ]
      },
      timetable: {
        monday: [
          {'00:00': [
            {name: 'John', _id: '1'},
            {name: 'Jack', _id: '2'},
            {name: 'Jacob', _id: '3'},
            {name: 'Jane', _id: '4'}
          ]},
          {'01:00': []},
          {'02:00': []},
          {'03:00': [
            {name: 'John', _id: '1'},
            {name: 'Jane', _id: '4'}
          ]},
          {'04:00': [
            {name: 'Jacob', _id: '3'},
            {name: 'Jane', _id: '4'}
          ]},
          {'05:00': []},
          {'06:00': []},
          {'07:00': []},
          {'08:00': []},
          {'09:00': []},
          {'10:00': []},
          {'11:00': []},
          {'12:00': []},
          {'13:00': []},
          {'14:00': []},
          {'15:00': []},
          {'16:00': []},
          {'17:00': []},
          {'18:00': []},
          {'19:00': []},
          {'20:00': []},
          {'21:00': []},
          {'22:00': []},
          {'23:00': []},
        ]
      }
    }

    this.removeEmployee = this.removeEmployee.bind(this);
    this.selectEmployee = this.selectEmployee.bind(this)
    this.addEmployee = this.addEmployee.bind(this);
    this.clearTimetable = this.clearTimetable.bind(this);
    this.clearEmployee = this.clearEmployee.bind(this);
  }

  removeEmployee(employeeToRemove, day, hourKey) {
    const newEmployees = this.state.timetable[day][Number(hourKey.slice(0, 2))][hourKey].filter(
      employee => employee._id !== employeeToRemove._id
    );
    const newTimetable = {...this.state.timetable};
    newTimetable[day][Number(hourKey.slice(0, 2))][hourKey] = newEmployees;
    this.setState({ timetable: newTimetable });
  }

  selectEmployee(employee) {
    this.setState({
      selectedEmployee: employee
    })
  }

  addEmployee(day, hourKey) {
    if ( this.state.selectedEmployee ) {
      if (this.state.timetable[day][Number(hourKey.slice(0, 2))][hourKey]) {
        let employeeInHour;
        this.state.timetable[day][Number(hourKey.slice(0, 2))][hourKey].forEach(employee => {
          if (employee._id === this.state.selectedEmployee._id) {
            employeeInHour = true;
          }
        })
        if ( !employeeInHour ) {
          const newTimetable = {...this.state.timetable}
          const newEmployees = [...this.state.timetable[day][Number(hourKey.slice(0, 2))][hourKey], this.state.selectedEmployee]
          newTimetable[day][Number(hourKey.slice(0, 2))][hourKey] = newEmployees;
          this.setState({ timetable: newTimetable });
        }
      }
    }
  }

  clearTimetable() {
    const newTimetable = {...this.state.timetable};
    Object.keys(newTimetable).forEach(day => {
      newTimetable[day].forEach(hour => {
        hour[Object.keys(hour)[0]] = [];
      })
    })
    this.setState({timetable: newTimetable})
  }

  clearEmployee() {
    Object.keys(this.state.timetable).forEach(dayKey => {
      this.state.timetable[dayKey].forEach(hourObj => {
        this.removeEmployee(this.state.selectedEmployee, dayKey, Object.keys(hourObj)[0])
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="buttonArray">
          <button onClick={this.clearTimetable}>Clear All</button>
          {
            this.state.selectedEmployee && 
            <button onClick={this.clearEmployee}>Clear {this.state.selectedEmployee.name}</button>
          }
        </div>
        <Carousel state={this.state} selectEmployee={this.selectEmployee}/>
        <br></br>
        <div className="timetableContainer">
          <div className="hourLabels">
            {this.state.timetable.monday.map(hour =>
              <p key={Object.keys(hour)[0]}>{Object.keys(hour)[0]}</p>  
            )}
          </div>
          <div className="monday">
            {this.state.timetable.monday.map(hour =>
              <Hour key={Object.keys(hour)[0]}
                    state={this.state}
                    removeEmployee={this.removeEmployee} 
                    addEmployee={this.addEmployee}
                    day="monday"
                    hourKey={Object.keys(hour)[0]}/>
            )}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
