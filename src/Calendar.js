import React, { Component } from 'react';

export class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: new Date()
        }

        this.dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.testFunc = this.testFunc.bind(this);
    }

    testFunc() {
        console.log(this.state.selectedDate.getDay());
    }

    toggleCalendar() {
        this.setState({ calendarDisplayed: !this.state.calendarDisplayed })
    }

    render() {
        return (
            <div className="calendarContainer">
                <div className="calendarNavbar">
                    <div>{this.monthLabels[this.state.selectedDate.getMonth()]} {this.state.selectedDate.getFullYear()}</div>
                    <div className="calendarArrows">
                        <span onClick={this.testFunc}>&lt;</span> <span>&gt;</span>
                    </div>
                </div>
                <div className="calendarBlock">
                    <div className="dayLetters">
                        {
                            this.dayLetters.map((letter, index) => 
                                <div key={index}>{letter}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}