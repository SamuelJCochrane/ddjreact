import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './App.css';

//COMPONENTS
import { Hour } from './Hour.js';
import { Carousel } from './Carousel.js';
import { Navbar } from './Navbar.js';
import { Calendar } from './Calendar.js';
import { NewEmployeeForm } from './NewEmployeeForm.js';

import { tempTimetable } from './tempTimetable.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: new Date(),
      newEmployeeForm: false,
      newEmployeeName: '',
      newEmployeeHours: 0,
      startHour: '00:00',
      endHour: '23:00',
      tempStartHour: '00:00',
      tempEndHour: '23:00',
      wrongTimeSelection: false,
      selectedEmployee: null,
      employees: [
        {name: 'John', totalHours: 0, hoursWanted: 1, _id: '1'},
        {name: 'Jack', totalHours: 0, hoursWanted: 50, _id: '2'},
        {name: 'Jacob', totalHours: 0, hoursWanted: 32, _id: '3'},
        {name: 'Jane', totalHours: 0, hoursWanted: 45, _id: '4'},
        {name: 'Jill', totalHours: 0, hoursWanted: 40, _id: '5'},
        {name: 'Janus', totalHours: 0, hoursWanted: 77, _id: '6'},
        {name: 'Jort', totalHours: 0, hoursWanted: 35, _id: '7'},
      ],
      timetable: tempTimetable,
      daysOfTheWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ],
      dayLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    }

    this.removeEmployee = this.removeEmployee.bind(this);
    this.selectEmployee = this.selectEmployee.bind(this)
    this.addEmployee = this.addEmployee.bind(this);
    this.clearTimetable = this.clearTimetable.bind(this);
    this.clearEmployee = this.clearEmployee.bind(this);
    this.toggleNewEmployeeForm = this.toggleNewEmployeeForm.bind(this);
    this.onNewEmployeeNameChange = this.onNewEmployeeNameChange.bind(this);
    this.onNewEmployeeHoursChange = this.onNewEmployeeHoursChange.bind(this);
    this.submitNewEmployee = this.submitNewEmployee.bind(this);
    this.onStartHourChange = this.onStartHourChange.bind(this);
    this.onEndHourChange = this.onEndHourChange.bind(this);
    this.onSubmitNewHours = this.onSubmitNewHours.bind(this);
    this.clearHiddenHours = this.clearHiddenHours.bind(this);
  }

  componentDidMount() {
    this.setState({ timetable: tempTimetable})
  }

  removeEmployee(employeeToRemove, day, hourKey) {
    const newEmployees = this.state.timetable[day][Number(hourKey.slice(0, 2))][hourKey].filter(
      employee => {
        return employee._id !== employeeToRemove._id
      }
    );
    const newTimetable = {...this.state.timetable};
    newTimetable[day][Number(hourKey.slice(0, 2))][hourKey] = newEmployees;
    const newEmployeesData = this.state.employees.map(employee => {
      if (employee._id === employeeToRemove._id && employee.totalHours > 0) {
        const newEmployee = {...employee};
        newEmployee.totalHours = newEmployee.totalHours - 1
        return newEmployee
      }
      else {return employee}
    })
    this.setState({ timetable: newTimetable, employees: newEmployeesData });
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
          const newEmployeesData = this.state.employees.map(employee => {
            if (employee._id === this.state.selectedEmployee._id) {
              const newEmployee = {...employee};
              ++newEmployee.totalHours
              return newEmployee
            }
            else {return employee}
          })
          this.setState({ timetable: newTimetable, employees: newEmployeesData });
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

    const newEmployeesData = this.state.employees.map(employee => {
      const newEmployee = {...employee};
      newEmployee.totalHours = 0;
      return newEmployee;
    })
    this.setState({timetable: newTimetable, employees: newEmployeesData})
  }

  clearEmployee() {
    Object.keys(this.state.timetable).forEach(dayKey => {
      this.state.timetable[dayKey].forEach(hourObj => {
        this.removeEmployee(this.state.selectedEmployee, dayKey, Object.keys(hourObj)[0])
      })
    })

    const newEmployeesData = this.state.employees.map(employee => {
      const newEmployee = {...employee};
      if ( newEmployee._id === this.state.selectedEmployee._id ) {
        newEmployee.totalHours = 0;
      }
      return newEmployee;
    })

    this.setState({ employees: newEmployeesData })
  }

  toggleNewEmployeeForm() {
    this.setState({ newEmployeeForm: !this.state.newEmployeeForm })
  }

  onNewEmployeeNameChange(event) {
    this.setState({ newEmployeeName: event.target.value })
  }

  onNewEmployeeHoursChange(event) {
    this.setState({ newEmployeeHours: event.target.value })
  }

  submitNewEmployee(event) {
    event.preventDefault();
  }

  onStartHourChange(event) {
    if (Number(event.target.value.slice(0,2)) < Number(this.state.endHour.slice(0,2))) {
      this.setState({ tempStartHour: event.target.value, wrongTimeSelection: false })
    } 
    else {
      this.setState({ wrongTimeSelection: true })
    }
  }

  onEndHourChange(event) {
    if (Number(this.state.startHour.slice(0,2)) < Number(event.target.value.slice(0,2))) {
      this.setState({ tempEndHour: event.target.value, wrongTimeSelection: false })
    }
    else {
      this.setState({ wrongTimeSelection: true })
    }
  }

  onSubmitNewHours(event) {
    if (Number(this.state.tempStartHour.slice(0,2)) < Number(this.state.tempEndHour.slice(0,2))) {
      this.setState({ startHour: this.state.tempStartHour, endHour: this.state.tempEndHour }, this.clearHiddenHours)
    }
  }

  clearHiddenHours() {
    const newTimetable = {'monday': [], 'tuesday': [], 'wednesday': [], 'thursday': [], 'friday': [], 'saturday': [], 'sunday': [], }
    this.state.daysOfTheWeek
      .forEach(day => 
        newTimetable[day] =
        this.state.timetable[day]
          .map(hourObj => {
            const hourKey = Object.keys(hourObj)[0];
            if (hourKey.slice(0,2) < this.state.startHour.slice(0,2) || hourKey.slice(0,2) > this.state.endHour.slice(0,2)) {
              const tempObj = {}
              tempObj[hourKey] = []
              return tempObj
            } 
            else {
              return hourObj
            }
          }
          )
      )

    let employeesToDecreaseIDs = {}
    for (let day in this.state.timetable) {
      this.state.timetable[day].forEach(hour => {
        if (
          hour[Object.keys(hour)[0]].length > 0 &&
          (Object.keys(hour)[0].slice(0,2) < this.state.startHour.slice(0,2) ||
          Object.keys(hour)[0].slice(0,2) > this.state.endHour.slice(0,2))
        ) 
        {
          hour[Object.keys(hour)[0]].forEach(employee => {
            if (employeesToDecreaseIDs[employee._id]) {
              ++employeesToDecreaseIDs[employee._id];
            }
            else {
              employeesToDecreaseIDs[employee._id] = 1;
            }
          }) 
        }
      }
      )
    }

    const newEmployees = this.state.employees.map(employee => {
      for (let employeeToDecreaseID in employeesToDecreaseIDs) {
        if (employeeToDecreaseID === employee._id) {
          const newEmployee = {...employee};
          newEmployee.totalHours -= employeesToDecreaseIDs[employee._id];
          return newEmployee;
        }
      }
      return employee;
    })

    this.setState({ timetable: newTimetable, employees: newEmployees })
  }

  generateMonth() {
    //TODO: Add capabality for leap year
    let firstDay = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), 1).getDay();
    //Date object week starts with sunday as 0. Here reassigning first day to 7 if 0.
    if (firstDay === 0 ) { firstDay = 7 }
    const month = this.state.selectedDate.getMonth();
    //Creates an array of numbers from 0 to 
    const daysArr = Array.apply(null, {length: this.state.daysInMonth[month] + 1}).map(Number.call, Number);
    daysArr.shift();

    if ( firstDay > 1 ) {
        const previousMonth = month === 0 ? 11 : month-1;
        const previousMonthDays = this.state.daysInMonth[previousMonth];
        const previousMonthDaysArr = Array.apply(null, {length: previousMonthDays + 1}).map(Number.call, Number);
        previousMonthDaysArr.shift();
        for (let i = 0; i < firstDay - 1; i++) {
            daysArr.unshift(previousMonthDaysArr[previousMonthDaysArr.length -1 -i])
        }
    }
    const daysInWeek = 7;
    const totalDaysDisplayed = 42;

    const daysLeft = totalDaysDisplayed - daysArr.length;
    for (let i = 1; i < daysLeft + 1 ; i++) {
        daysArr.push(i);
    }

    const daysInWeeksArr = []
    for (let i = 0; i < totalDaysDisplayed; i = i + daysInWeek ) {
        daysInWeeksArr.push(daysArr.slice(i, i+daysInWeek));
    }

    return daysInWeeksArr
  }

  render() {
    return (
      <div className="App">
      
        {this.state.timetable && 
        <div>
          <Navbar/>
          <div className="appContainer">
            <div className="buttonAndCarouselContainer">      
              <Carousel state={this.state} selectEmployee={this.selectEmployee}/>
              <div className="buttonArray">
                <button onClick={this.toggleNewEmployeeForm}>Add Employee</button>
                <button onClick={this.clearTimetable}>Clear All</button>
                {
                  this.state.selectedEmployee && 
                  <button onClick={this.clearEmployee}>Clear {this.state.selectedEmployee.name}</button>
                }
              </div>
              {
                this.state.newEmployeeForm &&
                <NewEmployeeForm
                  state={this.state}
                  toggleNewEmployeeForm={this.toggleNewEmployeeForm}
                  submitNewEmployee={this.submitNewEmployee}
                  onNewEmployeeNameChange={this.onNewEmployeeNameChange}
                  onNewEmployeeHoursChange={this.onNewEmployeeHoursChange}/>
              }
              <Calendar state={this.state} generateMonth={this.generateMonth}/>
              <div className="timesSelection">
                <span>Start:</span>
                <select value={this.state.tempStartHour} onChange={this.onStartHourChange}>
                  {
                    this.state.hours.map(hour => 
                      <option key={hour} value={hour}>{hour}</option>  
                    )
                  }
                </select>
                <span>End:</span>
                <select value={this.state.tempEndHour} onChange={this.onEndHourChange}>
                  {
                    this.state.hours.map(hour => 
                      <option key={hour} value={hour}>{hour}</option>  
                    )
                  }
                </select>
                <button onClick={this.onSubmitNewHours}>Submit</button>
              </div>
              {
                this.state.wrongTimeSelection &&
                <span>Confucius said, 'Things must begin before they end'</span>
              }
            </div>
            <div className="weekTitle">
              <h2>WEEK</h2>
              <h2>MONTH YEAR</h2>
            </div>
            <div className="dayLabels">
                {
                  this.state.daysOfTheWeek.map(day =>
                    <div key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                  )
                }
            </div>
            <div className="timetableContainer">
              <div className="hourLabels">
                {
                this.state.timetable.monday
                  .filter(hour => {
                    return (
                      Object.keys(hour)[0].slice(0,2) <=  this.state.endHour.slice(0,2) && 
                      Object.keys(hour)[0] > this.state.startHour.slice(0,2) )
                    }
                  )
                  .map(hour =>
                    <p key={Object.keys(hour)[0]}>{Object.keys(hour)[0]}</p>  
                  )
                }
              </div>

              {
                this.state.daysOfTheWeek.map(day =>
                  <div key={day} className="day">
                    {this.state.timetable[day]
                      .filter(hour => {
                        return (
                          Object.keys(hour)[0].slice(0,2) <=  this.state.endHour.slice(0,2) && 
                          Object.keys(hour)[0] > this.state.startHour.slice(0,2) )
                        }
                      )
                      .map(hour =>
                        <Hour key={Object.keys(hour)[0]}
                              state={this.state}
                              removeEmployee={this.removeEmployee} 
                              addEmployee={this.addEmployee}
                              day={day}
                              hourKey={Object.keys(hour)[0]}/>
                    )}
                  </div>
                )
              }
            </div>
            </div>
          </div>}
        </div>
    );
  }
}

export default App;
