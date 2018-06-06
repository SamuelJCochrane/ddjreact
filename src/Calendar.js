import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export class Calendar extends Component {
    constructor(props) {
        super(props);
        
        // this.generateMonth = props.generateMonth;
        // this.generateWeekID = props.generateWeekID;
        // this.setTimetable = props.setTimetable;
        // this.setSelectedWeek = props.setSelectedWeek;
        // this.setSelectedDate = props.setSelectedDate;

        // this.monthLabels = props.monthLabels;
        // this.daysInMonth = props.daysInMonth;
        // this.selectedDate = props.selectedDate;
        // this.selectedWeek = props.selectedWeek;
        // this.dayLetters = props.dayLetters;

        this.state = {
            generateMonth: this.props.generateMonth,
            generateWeekID: this.props.generateWeekID,
            setTimetable: this.props.setTimetable,
            setSelectedWeek: this.props.setSelectedWeek,
            setSelectedDate: this.props.setSelectedDate,
            updateEmployeeHours: this.props.updateEmployeeHours,
    
            monthLabels: this.props.monthLabels,
            daysInMonth: this.props.daysInMonth,
            selectedDate: this.props.selectedDate,
            selectedWeek: this.props.selectedWeek,
            dayLetters: this.props.dayLetters,
        }

        
        this.homeMonth = this.homeMonth.bind(this);
        this.calendarRight = this.calendarRight.bind(this);
        this.calendarLeft = this.calendarLeft.bind(this);
        // this.setSelectedWeek = this.setSelectedWeek.bind(this);
        this.testFunc = this.testFunc.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            selectedDate: nextProps.selectedDate, 
            selectedWeek: nextProps.selectedWeek 
        })
    }

    homeMonth() {
        // this.setState({ selectedDate: new Date() })
        this.state.setSelectedDate(new Date())
    }

    calendarRight() {
        const [ currentMonth, currentYear ] = [ this.state.selectedDate.getMonth(), this.state.selectedDate.getFullYear() ]
        const newMonth = currentMonth + 1;
        // this.setState({ selectedDate: new Date(currentYear, newMonth)})
        this.state.setSelectedDate(new Date(currentYear, newMonth));
    }

    calendarLeft() {
        const [ currentMonth, currentYear ] = [ this.state.selectedDate.getMonth(), this.state.selectedDate.getFullYear() ];
        const newMonth = currentMonth - 1;
        console.log(currentMonth);
        console.log(newMonth)
        // this.setState({ selectedDate: new Date(currentYear, newMonth)});
        console.log(new Date(currentYear, newMonth))
        this.state.setSelectedDate(new Date(currentYear, newMonth))
    }

    testFunc() {
        console.log(this.state.selectedDate);
    }

    render() {
        const selectedDate = this.state.selectedDate;
        const selectedWeek = this.state.selectedWeek;
        
        const daysInWeeksArr = this.state.generateMonth(selectedDate, this.state.daysInMonth)
        return (
            <div className="calendarContainer">
                {/* <button onClick={this.testFunc}>TEST</button> */}
                <div className="calendarNavbar">
                    <div>{this.state.monthLabels[selectedDate.getMonth()]} {selectedDate.getFullYear()}</div>
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
                                    let weekID = this.state.generateWeekID(selectedDate.getFullYear(), selectedDate.getMonth(), week, index);
                                    return (
                                        <div    key={index} 
                                                className={`weekRow ${weekID === selectedWeek ? "selectedWeek" : ''}`} 
                                                id={weekID}
                                                onClick={() => this.state.setSelectedWeek(weekID)}>
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