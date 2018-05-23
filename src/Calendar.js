import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = props.state;

        this.dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        this.monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.homeMonth = this.homeMonth.bind(this);
        this.calendarRight = this.calendarRight.bind(this);
        this.calendarLeft = this.calendarLeft.bind(this);
    }

    homeMonth() {
        this.setState({ selectedDate: new Date() })
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
        //TODO: Add capabality for leap year
        let firstDay = new Date(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), 1).getDay();
        //Date object week starts with sunday as 0. Here reassigning first day to 7 if 0.
        if (firstDay === 0 ) { firstDay = 7 }
        const month = this.state.selectedDate.getMonth();

        const daysArr = Array.apply(null, {length: this.daysInMonth[month] + 1}).map(Number.call, Number);
        daysArr.shift();

        if ( firstDay > 1 ) {
            const previousMonth = month === 0 ? 11 : month-1;
            const previousMonthDays = this.daysInMonth[previousMonth];
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

        return (
            <div className="calendarContainer">
                <div className="calendarNavbar">
                    <div>{this.monthLabels[this.state.selectedDate.getMonth()]} {this.state.selectedDate.getFullYear()}</div>
                    <div className="calendarArrows">
                        <span onClick={this.homeMonth}><FontAwesome name='home'/></span> 
                        <span onClick={this.calendarLeft}><FontAwesome name='angle-left'/></span> 
                        <span onClick={this.calendarRight}><FontAwesome name='angle-right'/></span>
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