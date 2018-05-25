import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = props.state;
        this.generateMonth = props.generateMonth;
        this.generateWeekID = props.generateWeekID;
        
        this.toggleCalendar = this.toggleCalendar.bind(this);
        this.homeMonth = this.homeMonth.bind(this);
        this.calendarRight = this.calendarRight.bind(this);
        this.calendarLeft = this.calendarLeft.bind(this);
        this.setSelectedWeek = this.setSelectedWeek.bind(this);
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

    setSelectedWeek(weekID) {
        this.setState({ selectedWeek: weekID })
    }

    render() {

        const daysInWeeksArr = this.generateMonth()

        return (
            <div className="calendarContainer">
                <div className="calendarNavbar">
                    <div>{this.state.monthLabels[this.state.selectedDate.getMonth()]} {this.state.selectedDate.getFullYear()}</div>
                    <div className="calendarArrows">
                        <span onClick={this.homeMonth}><FontAwesome name='home'/></span> 
                        <span onClick={this.calendarLeft}><FontAwesome name='angle-left'/></span> 
                        <span onClick={this.calendarRight}><FontAwesome name='angle-right'/></span>
                    </div>
                </div>
                <div className="calendarBlock">
                    <div className="dayLetters">
                        {
                            this.state.dayLetters.map((letter, index) => 
                                <div key={index}>{letter}</div>
                            )
                        }
                    </div>
                    <div className="daysOfMonth">
                        {
                            daysInWeeksArr.map((week, index) => 
                                {
                                    let weekID = this.generateWeekID(this.state.selectedDate.getFullYear(), this.state.selectedDate.getMonth(), week, index);
                                    return (
                                        <div    key={index} 
                                                className={`weekRow ${weekID === this.state.selectedWeek ? "selectedWeek" : ''}`} 
                                                id={weekID}
                                                onClick={() => this.setSelectedWeek(weekID)}>
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