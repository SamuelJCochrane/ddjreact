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
        this.calendarRight = this.calendarRight.bind(this);
        this.calendarLeft = this.calendarLeft.bind(this);
    }

    calendarRight() {
        const [ currentMonth, currentYear ] = [ this.state.selectedDate.getMonth(), this.state.selectedDate.getFullYear() ]
        const newMonth = currentMonth + 1;
        this.setState({ selectedDate: new Date(currentYear, newMonth)})
    }

    calendarLeft() {
        const [ currentMonth, currentYear ] = [ this.state.selectedDate.getMonth(), this.state.selectedDate.getFullYear() ];
        const newMonth = currentMonth - 1;
        this.setState({ selectedDate: new Date(currentYear, newMonth)});
    }

    toggleCalendar() {
        this.setState({ calendarDisplayed: !this.state.calendarDisplayed })
    }

    render() {

        const firstDay = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth()).getDay();
        const month = this.state.selectedDate.getMonth();
        const daysArr = Array.apply(null, {length: this.daysInMonth[month] + 1}).map(Number.call, Number);
        daysArr.shift();

        if ( firstDay > 1 ) {
            const previousMonth = month === 0 ? 11 : month-1;
            console.log(previousMonth)
            const previousMonthDays = this.daysInMonth[previousMonth];
            const previousMonthDaysArr = Array.apply(null, {length: previousMonthDays + 1}).map(Number.call, Number);
            previousMonthDaysArr.shift();
            for (let i = 0; i < firstDay - 1; i++) {
                daysArr.unshift(previousMonthDaysArr[previousMonthDaysArr.length -1 -i])
            }
        }

        const daysLeftInLastWeek = daysArr.length % 7;
        for (let i = 1; i < daysLeftInLastWeek + 7 ; i++) {
            daysArr.push(i);
        }

        const daysInWeek = 7;
        const totalDaysDisplayed = 42;
        const daysInWeeksArr = []
        for (let i = 0; i < totalDaysDisplayed; i = i + daysInWeek ) {
            daysInWeeksArr.push(daysArr.slice(i, i+daysInWeek));
        }

        console.log(daysInWeeksArr);


        return (
            <div className="calendarContainer">
                <div className="calendarNavbar">
                    <div>{this.monthLabels[this.state.selectedDate.getMonth()]} {this.state.selectedDate.getFullYear()}</div>
                    <div className="calendarArrows">
                        <span onClick={this.calendarLeft}>&lt;</span> <span onClick={this.calendarRight}>&gt;</span>
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
                    <div className="daysOfMonth">
                        {
                            daysInWeeksArr.map((week, index) => 
                                {
                                    return (
                                        <div key={index} className="weekRow">
                                            {week.map((date, index) => 
                                                <div key={index} className="dayInRow">{date}</div>
                                            )}
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}