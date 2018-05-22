import React, { Component } from 'react';
import './App.css';
import { Hour } from './Hour.js';
import { Carousel } from './Carousel.js';
import { Navbar } from './Navbar.js';
import { Calendar } from './Calendar.js';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newEmployeeModal: false,
      newEmployeeModalData: {
        name: ''
      },
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
      timetable: {
        monday: [
          {'00:00': []},
          {'01:00': []},
          {'02:00': []},
          {'03:00': []},
          {'04:00': []},
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
        ],
        tuesday: [
          {'00:00': []},
          {'01:00': []},
          {'02:00': []},
          {'03:00': []},
          {'04:00': []},
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
        ],
        wednesday: [
          {'00:00': []},
          {'01:00': []},
          {'02:00': []},
          {'03:00': []},
          {'04:00': []},
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
        ],
        thursday: [
          {'00:00': []},
          {'01:00': []},
          {'02:00': []},
          {'03:00': []},
          {'04:00': []},
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
        ],
        friday: [
          {'00:00': []},
          {'01:00': []},
          {'02:00': []},
          {'03:00': []},
          {'04:00': []},
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
        ],
        saturday: [
          {'00:00': []},
          {'01:00': []},
          {'02:00': []},
          {'03:00': []},
          {'04:00': []},
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
        ],
        sunday: [
          {'00:00': []},
          {'01:00': []},
          {'02:00': []},
          {'03:00': []},
          {'04:00': []},
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
        ],
      }
    }

    this.removeEmployee = this.removeEmployee.bind(this);
    this.selectEmployee = this.selectEmployee.bind(this)
    this.addEmployee = this.addEmployee.bind(this);
    this.clearTimetable = this.clearTimetable.bind(this);
    this.clearEmployee = this.clearEmployee.bind(this);
    this.displayAddEmployeeModal = this.displayAddEmployeeModal.bind(this);
    this.removeAddEmployeeModal = this.removeAddEmployeeModal.bind(this);
    this.onNewEmployeeNameChange = this.onNewEmployeeNameChange.bind(this);
    this.submitNewEmployee = this.submitNewEmployee.bind(this);
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

  displayAddEmployeeModal() {
    this.setState({newEmployeeModal: true})
  }

  removeAddEmployeeModal() {
    this.setState({newEmployeeModal: false})
  }

  onNewEmployeeNameChange(event) {
    this.setState({ newEmployeeModalData: {name: event.target.value } })
  }

  submitNewEmployee(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className="appContainer">
          <div className="buttonAndCarouselContainer">
            <div className="buttonArray">
              <button onClick={this.displayAddEmployeeModal}>Add Employee</button>
              <button onClick={this.clearTimetable}>Clear All</button>
              {
                this.state.selectedEmployee && 
                <button onClick={this.clearEmployee}>Clear {this.state.selectedEmployee.name}</button>
              }
            </div>
            <Carousel state={this.state} selectEmployee={this.selectEmployee}/>
            <Calendar/>
          </div>
          <div className="timetableContainer">
            <div className="hourLabels">
              {this.state.timetable.monday.map(hour =>
                <p key={Object.keys(hour)[0]}>{Object.keys(hour)[0]}</p>  
              )}
            </div>
            <div className="day">
              {this.state.timetable.monday.map(hour =>
                <Hour key={Object.keys(hour)[0]}
                      state={this.state}
                      removeEmployee={this.removeEmployee} 
                      addEmployee={this.addEmployee}
                      day="monday"
                      hourKey={Object.keys(hour)[0]}/>
              )}
            </div>
            <div className="day">
              {this.state.timetable.tuesday.map(hour =>
                <Hour key={Object.keys(hour)[0]}
                      state={this.state}
                      removeEmployee={this.removeEmployee} 
                      addEmployee={this.addEmployee}
                      day="tuesday"
                      hourKey={Object.keys(hour)[0]}/>
              )}
            </div>
            <div className="day">
              {this.state.timetable.wednesday.map(hour =>
                <Hour key={Object.keys(hour)[0]}
                      state={this.state}
                      removeEmployee={this.removeEmployee} 
                      addEmployee={this.addEmployee}
                      day="wednesday"
                      hourKey={Object.keys(hour)[0]}/>
              )}
            </div>
            <div className="day">
              {this.state.timetable.thursday.map(hour =>
                <Hour key={Object.keys(hour)[0]}
                      state={this.state}
                      removeEmployee={this.removeEmployee} 
                      addEmployee={this.addEmployee}
                      day="thursday"
                      hourKey={Object.keys(hour)[0]}/>
              )}
            </div>
            <div className="day">
              {this.state.timetable.friday.map(hour =>
                <Hour key={Object.keys(hour)[0]}
                      state={this.state}
                      removeEmployee={this.removeEmployee} 
                      addEmployee={this.addEmployee}
                      day="friday"
                      hourKey={Object.keys(hour)[0]}/>
              )}
            </div>
            <div className="day">
              {this.state.timetable.saturday.map(hour =>
                <Hour key={Object.keys(hour)[0]}
                      state={this.state}
                      removeEmployee={this.removeEmployee} 
                      addEmployee={this.addEmployee}
                      day="saturday"
                      hourKey={Object.keys(hour)[0]}/>
              )}
            </div>
            <div className="day">
              {this.state.timetable.sunday.map(hour =>
                <Hour key={Object.keys(hour)[0]}
                      state={this.state}
                      removeEmployee={this.removeEmployee} 
                      addEmployee={this.addEmployee}
                      day="sunday"
                      hourKey={Object.keys(hour)[0]}/>
              )}
            </div>
          </div>
          </div>
            { 
              this.state.newEmployeeModal &&
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={this.removeAddEmployeeModal}>&times;</span>
                  <form>
                    Name:
                    <input type="text" name="name" onChange={this.onNewEmployeeNameChange}/>
                    <input type="submit" value="Submit" onClick={this.submitNewEmployee}/>
                  </form>
                </div>
              </div>
            }
        </div>
    );
  }
}

export default App;
