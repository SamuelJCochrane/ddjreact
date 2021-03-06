import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
//import './App.css';

//COMPONENTS
import { Hour } from '../Hour/Hour.js';
import { Carousel } from '../Carousel/Carousel.js';
import { Navbar } from '../Navbar/Navbar.js';
import { Calendar } from '../Calendar/Calendar.js';
import { NewEmployeeForm } from '../NewEmployeeForm/NewEmployeeForm.js';

import { tempTimetable } from '../../tempTimetable.js';
import { timetables2018, Timetable } from '../../tempYear.js';

export class TimetablePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedDate: new Date(),
      selectedWeek: null,
      newEmployeeForm: false,
      newEmployeeName: '',
      newEmployeeHours: 0,
      startHour: '06:00',
      endHour: '23:00',
      tempStartHour: '06:00',
      tempEndHour: '23:00',
      wrongTimeSelection: false,
      selectedEmployee: null,
      selectedDay: 'monday',
      multiStartHour: '06:00',
      multiEndHour: '23:00',

      // employees: [
      //   {name: 'John', totalHours: 0, hoursWanted: 1, _id: '1'},
      //   {name: 'Jack', totalHours: 0, hoursWanted: 50, _id: '2'},
      //   {name: 'Jacob', totalHours: 0, hoursWanted: 32, _id: '3'},
      //   {name: 'Jane', totalHours: 0, hoursWanted: 45, _id: '4'},
      //   {name: 'Jill', totalHours: 0, hoursWanted: 40, _id: '5'},
      //   {name: 'Janus', totalHours: 0, hoursWanted: 77, _id: '6'},
      //   {name: 'Jort', totalHours: 0, hoursWanted: 35, _id: '7'},
      // ],
      employees: null,
      timetable: null,
      allTimetables: null,
      daysOfTheWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ],
      dayLetters: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      
    }

    this.removeEmployee = this.removeEmployee.bind(this);
    this.selectEmployee = this.selectEmployee.bind(this)
    this.addEmployee = this.addEmployee.bind(this);
    this.addToMultiHours = this.addToMultiHours.bind(this);
    this.clearTimetable = this.clearTimetable.bind(this);
    this.clearEmployee = this.clearEmployee.bind(this);
    this.toggleNewEmployeeForm = this.toggleNewEmployeeForm.bind(this);
    this.onNewEmployeeNameChange = this.onNewEmployeeNameChange.bind(this);
    this.onNewEmployeeHoursChange = this.onNewEmployeeHoursChange.bind(this);
    this.submitNewEmployee = this.submitNewEmployee.bind(this);
    this.onStartHourChange = this.onStartHourChange.bind(this);
    this.onEndHourChange = this.onEndHourChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.onMultiStartHourChange = this.onMultiStartHourChange.bind(this);
    this.onMultiEndHourChange = this.onMultiEndHourChange.bind(this);
    this.onSubmitNewHours = this.onSubmitNewHours.bind(this);
    this.clearHiddenHours = this.clearHiddenHours.bind(this);
    this.generateWeekID = this.generateWeekID.bind(this);
    this.parseWeekID = this.parseWeekID.bind(this);
    this.setTimetable = this.setTimetable.bind(this);
    this.setSelectedWeek = this.setSelectedWeek.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.getEmployeeTotalHours = this.getEmployeeTotalHours.bind(this);
    this.getTimetables = this.getTimetables.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.testFunc = this.testFunc.bind(this);
  }

  componentDidMount() {
    this.getTimetables();
    this.getEmployees();
    //this.setState({ allTimetables: timetables2018})
  }

  removeEmployee(employeeToRemove, day, hourKey, event) {
    event.stopPropagation();
    this.state.timetable.removeEmployee(employeeToRemove, day, hourKey);
    this.setState({ timetable: this.state.timetable }, this.updateEmployeeHours)
  }

  selectEmployee(employee) {
    this.setState({
      selectedEmployee: employee
    })
  }

  addEmployee(day, hourKey) {
    if (this.state.selectedEmployee) {
      this.state.timetable.addEmployee(this.state.selectedEmployee, day, hourKey);
      this.setState({ timetable: this.state.timetable }, this.updateEmployeeHours);
    }
  }

  addToMultiHours() {
    console.log(this.state.selectedEmployee)
    console.log(this.state.multiStartHour)
    console.log(this.state.multiEndHour)
    if (this.state.timetable && this.state.selectedEmployee && this.state.multiStartHour && this.state.multiEndHour) {
      const hoursArr = this.state.hours.slice(
        this.state.hours.indexOf(this.state.multiStartHour),
        this.state.hours.indexOf(this.state.multiEndHour) + 1
      )
      hoursArr.forEach(hour => {
        console.log(this.state.selectedDay)
        console.log(hour)
        this.addEmployee(this.state.selectedDay, hour)
      })
    }
  }

  clearTimetable() {
    // const newTimetable = {...this.state.timetable};
    // Object.keys(newTimetable).forEach(day => {
    //   newTimetable[day].forEach(hour => {
    //     hour[Object.keys(hour)[0]] = [];
    //   })
    // })

    // const newEmployeesData = this.state.employees.map(employee => {
    //   const newEmployee = {...employee};
    //   newEmployee.totalHours = 0;
    //   return newEmployee;
    // })
    // this.setState({timetable: newTimetable, employees: newEmployeesData})
    this.state.timetable.clearAllEmployees();
    this.setState({ timetable: this.state.timetable }, this.updateEmployeeHours);
  }

  clearEmployee() {
    this.state.timetable.clearEmployee(this.state.selectedEmployee._id)
    this.setState({ timetable: this.state.timetable }, this.updateEmployeeHours)
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
    axios({
      method: 'post',
      url: '/api/employees',
      data: {
        name: this.state.newEmployeeName,
        hoursWanted: this.state.newEmployeeHours
      }
    })
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
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

  onDayChange(event) {
    this.setState({ selectedDay: event.target.value })
  }

  onMultiStartHourChange(event) {
    this.setState({ multiStartHour: event.target.value })
  }

  onMultiEndHourChange(event) {
    this.setState({ multiEndHour: event.target.value })
  }

  onSubmitNewHours(event) {
    if (this.state.timetable && Number(this.state.tempStartHour.slice(0,2)) < Number(this.state.tempEndHour.slice(0,2))) {
      this.setState({ startHour: this.state.tempStartHour, endHour: this.state.tempEndHour }, this.clearHiddenHours)
    }
  }

  clearHiddenHours() {
    this.state.timetable.clearHiddenHours(Number(this.state.startHour.slice(0,2)), Number(this.state.endHour.slice(0,2)))
    this.setState({ timetable: this.state.timetable }, this.updateEmployeeHours)
  }

  generateMonth(selectedDate, daysInMonth) {
    //TODO: Add capabality for leap year
    let firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    //Date object week starts with sunday as 0. Here reassigning first day to 7 if 0.
    if (firstDay === 0 ) { firstDay = 7 }
    const month = selectedDate.getMonth();
    //Creates an array of numbers from 0 to 
    const daysArr = Array.apply(null, {length: daysInMonth[month] + 1}).map(Number.call, Number);
    daysArr.shift();

    if ( firstDay > 1 ) {
        const previousMonth = month === 0 ? 11 : month-1;
        const previousMonthDays = daysInMonth[previousMonth];
        const previousMonthDaysArr = Array.apply(null, {length: previousMonthDays + 1}).map(Number.call, Number);
        previousMonthDaysArr.shift();
        for (let i = 1; i < firstDay; i++) {
            daysArr.unshift(previousMonthDaysArr[previousMonthDaysArr.length -i])
        }
    }
    const daysInWeek = 7;
    let totalDaysDisplayed;
    
    daysArr.length > 35 ? totalDaysDisplayed = 42 : totalDaysDisplayed = 35;

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

  generateWeekID(year, month, weekArr, weekIndex) {
    let weekID = `${year}`
    if (weekIndex === 0) {
        // If monday of first week is in previous month
        if (weekArr[0] > 20) {
            let newMonth = month > 0 ? month - 1 : 11;
            weekID = `${weekID}-${newMonth}-${weekArr[0]}-${month}-${weekArr[6]}`;
            return weekID
        }
        else {
            weekID = `${weekID}-${month}-${weekArr[0]}-${month}-${weekArr[6]}`;
            return weekID;
        }
    }
    else if (weekIndex === 4 || weekIndex === 5) {
        if (weekArr[6] < 20) {
            let newMonth = month < 11 ? month + 1 : 0;
            weekID = `${weekID}-${month}-${weekArr[0]}-${newMonth}-${weekArr[6]}`;
            return weekID;
        }
        else {
            weekID = `${weekID}-${month}-${weekArr[0]}-${month}-${weekArr[6]}`;
            return weekID; 
        }
    }
    else {
        weekID = `${weekID}-${month}-${weekArr[0]}-${month}-${weekArr[6]}`;
        return weekID;
    }
  }

  setTimetable(newTimetable) {
    this.setState({ timetable: newTimetable }, this.updateEmployeeHours)
  }

  setSelectedWeek(newWeekID) {
    this.setState({ selectedWeek: newWeekID }, () => {
        this.setTimetable({...this.state.allTimetables[this.state.selectedWeek]});
      })
  }

  setSelectedDate(newDate) {
    this.setState({ selectedDate: newDate })
  }

  parseWeekID(weekID) {
    if (weekID) {
      const weekIDArr = weekID.split('-');
      return weekIDArr
    }
    else {
      return []
    }
  }

  getEmployeeTotalHours(id, timetable) {
    let count = 0;
    timetable.days.forEach(day => {
        timetable[day].forEach(hourObj => {
            if (hourObj[Object.keys(hourObj)[0]].length > 0) {
              hourObj[Object.keys(hourObj)[0]].forEach(employee => {
                if (employee._id === id) {
                  ++count
                }
              })
            }
        })
    })
    return count;
  }

  updateEmployeeHours() {
    if (this.state.timetable) {
      let newEmployees = [...this.state.employees];
      newEmployees.forEach(employee => {
        let count = this.state.timetable.getEmployeeTotalHours(employee._id)
        employee.totalHours = count;
      })
      this.setState({ employees: newEmployees });
    }
  }

  updateTimetable() {
    
  }

  getTimetables() {
    let allTimetables;
    axios({
      method: 'get',
      url: '/api/weeks'
    })
    .catch(err => {
      console.log(err)
    })
    .then(res => {
      allTimetables = res.data;
      // console.log(allTimetables)
      this.constructAllTimetables(allTimetables);
    })
  }

  constructAllTimetables(timetables) {
    const timetables2018 = {}
    timetables.forEach(table => {
      const newTimetable = new Timetable();
      const weekObj = {}
      this.state.daysOfTheWeek.forEach(day => {
        weekObj[day] = [...table[day]]
      })
      newTimetable.addBulkEmployees(weekObj);
      timetables2018[table.weekID] = newTimetable;
    })
    this.setState({ allTimetables: timetables2018})
  }

  getEmployees() {
    let employees;
    axios({
      method: 'get',
      url: '/api/employees'
    })
    .catch(err => {
      console.log(err)
    })
    .then(res => {
      console.log(res.data)
      this.setState({employees: res.data})
    })
  }

  testFunc() {
    console.log('test')
  }

  render() {
    const weekIDArr = this.parseWeekID(this.state.selectedWeek)
    
    return (
      <div className="App">
        {true && 
        <div>
          {/* <Navbar/> */}
          <div className="appContainer">
            <div className="buttonAndCarouselContainer">      
              {/* <button onClick={this.testFunc}>TEST</button> */}
              { this.state.employees &&
              <Carousel state={this.state} selectEmployee={this.selectEmployee}/>
              }
              <div className="multiChanges">
                Day:
                <select value={this.state.selectedDay} onChange={this.onDayChange}>
                  {
                    this.state.daysOfTheWeek
                      .map(day => 
                        <option key={day} value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</option>  
                      )
                  }
                </select>
                Start:
                <select value={this.state.multiStartHour} onChange={this.onMultiStartHourChange}>
                  {
                    this.state.hours
                      .filter(hour => {
                        if (Number(hour.slice(0,2)) < Number(this.state.tempStartHour.slice(0,2))) {
                          return false
                        }
                        else if (Number(hour.slice(0,2)) > Number(this.state.tempEndHour.slice(0,2)) ) {
                          return false
                        }
                        else {
                          return true
                        }                        
                        }
                      )
                      .map(hour => 
                        <option key={hour} value={hour}>{hour}</option>  
                      )
                  }
                </select>
                End:
                <select value={this.state.multiEndHour} onChange={this.onMultiEndHourChange}>
                  {
                    this.state.hours
                      .filter(hour => {
                        if (Number(hour.slice(0,2)) < Number(this.state.tempStartHour.slice(0,2))) {
                          return false
                        }
                        else if (Number(hour.slice(0,2)) > Number(this.state.tempEndHour.slice(0,2)) ) {
                          return false
                        }
                        else {
                          return true
                        }                        
                        }
                      )
                      .map(hour => 
                        <option key={hour} value={hour}>{hour}</option>  
                      )
                  }
                </select>
                { 
                  this.state.selectedEmployee &&
                  <button onClick={this.addToMultiHours}>Add {this.state.selectedEmployee.name}</button>
                }
              </div>
              <div className="buttonArray">
                <button onClick={this.toggleNewEmployeeForm}>Add Employee</button>
                <button onClick={this.clearTimetable}>Clear Week</button>
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
              { this.state.allTimetables &&
                <Calendar 
                  monthLabels={this.state.monthLabels}
                  daysInMonth={this.state.daysInMonth}
                  selectedDate={this.state.selectedDate}
                  selectedWeek={this.state.selectedWeek}
                  dayLetters={this.state.dayLetters}
                  generateMonth={this.generateMonth} 
                  generateWeekID={this.generateWeekID}
                  setTimetable={this.setTimetable}
                  setSelectedWeek={this.setSelectedWeek}
                  setSelectedDate={this.setSelectedDate}/>
              }
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
            </div>

            <div className="centreContainer">
            { this.state.timetable ?
              (<div className="awkwardContainer">
                <div className="fixedHeader">
                  {
                    this.state.selectedWeek &&
                    <div className="weekTitle">
                      <h2>{weekIDArr[2]}th {this.state.monthLabels[weekIDArr[1]]} - {weekIDArr[4]}th {this.state.monthLabels[weekIDArr[3]]}</h2>
                    </div>
                  }
                  <div className="dayLabels">
                    {
                      this.state.daysOfTheWeek.map(day =>
                        <div key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                      )
                    }
                  </div>
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
                              Object.keys(hour)[0].slice(0,2) >= this.state.startHour.slice(0,2) )
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
              </div>)
              :
              <div className="promptToSelectWeek"> <FontAwesome name="arrow-left"/> SELECT A WEEK</div>
              }
            </div>
            </div>
          </div>}
        </div>
    );
  }
}

//export default App;
