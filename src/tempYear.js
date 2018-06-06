//import { tempTimetable } from './tempTimetable.js';

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export class Timetable {
    // TODO: turn days into objects
    constructor() {
      this.monday = [
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
      ];
      this.tuesday = [
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
      ];
      this.wednesday = [
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
      ];
      this.thursday = [
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
      ];
      this.friday = [
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
      ];
      this.saturday = [
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
      ];
      this.sunday = [
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
      ]
      this.hours = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ];
      this.days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      this.getEmployeeTotalHours = this.getEmployeeTotalHours.bind(this);
      this.removeEmployee = this.removeEmployee.bind(this);
      this.clearAllEmployees = this.clearAllEmployees.bind(this);
      this.clearEmployee = this.clearEmployee.bind(this);
      this.addEmployee = this.addEmployee.bind(this);
      this.clearHiddenHours = this.clearHiddenHours.bind(this);
      this.addBulkEmployees = this.addBulkEmployees.bind(this);

    }

    getEmployeeTotalHours(id) {
        let count = 0;
        this.days.forEach(day => {
            this[day].forEach(hourObj => {
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
    
    removeEmployee(employee, day, hourKey) {
        const i = this[day][Number(hourKey.slice(0,2))][Object.keys(this[day][Number(hourKey.slice(0,2))])[0]].indexOf(employee);
        this[day][Number(hourKey.slice(0,2))][Object.keys(this[day][Number(hourKey.slice(0,2))])[0]].splice(i, 1)
    }

    clearAllEmployees() {
        this.days.forEach(day => {
            this.hours.forEach(hour => {
                const arr = this[day][Number(hour.slice(0,2))][hour]
                arr.splice(0, arr.length)
            })
        })
    }

    clearEmployee(id) {
        this.days.forEach(day => {
            this[day].forEach(hourObj => {
                if (hourObj[Object.keys(hourObj)[0]].length > 0) {
                    hourObj[Object.keys(hourObj)[0]].forEach(employee => {
                      if (employee._id === id) {
                        hourObj[Object.keys(hourObj)[0]].splice(hourObj[Object.keys(hourObj)[0]].indexOf(employee), 1)
                      }
                    })
                }
            })
        })
    }
    
    addEmployee(employee, day, hourKey) {
        const hourNum = Number(hourKey.slice(0,2))
        if (this[day][hourNum][Object.keys(this[day][hourNum])[0]].indexOf(employee) === -1) {
            this[day][hourNum][Object.keys(this[day][hourNum])[0]].push(employee);
        }
    }

    getEmployeeHours(id) {
        let count = 0;
        this.days.forEach(day => {
            this[day].forEach(hourObj => {
                let hourArr = Object.keys(hourObj)[0];
                hourArr.forEach(employee => {
                    if (employee._id === id) {
                        ++count 
                    }
                })
            })
        })
    }

    clearHiddenHours(start, end) {
        this.days.forEach(day => {
            console.log(day);
            this[day].forEach(hourObj => {
                const hourNum = Number(Object.keys(hourObj)[0].slice(0,2));
                if ( hourNum < start || hourNum > end ) { 
                    const hourArr = hourObj[Object.keys(hourObj)[0]];
                    hourArr.splice(0, hourArr.length);
                }
            })
        })
    }

    addBulkEmployees(weekObj) {
        for (let day in weekObj) {
            weekObj[day].forEach(hourObj => {
                for (let hour in hourObj) {
                    hourObj[hour].forEach(employee => {
                        this.addEmployee(employee, day, hour)
                    })
                }
            })
        }
    }

    test() {console.log('test')}
}

function generateMonth(date) {
    //TODO: Add capabality for leap year
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    //Date object week starts with sunday as 0. Here reassigning first day to 7 if 0.
    if (firstDay === 0 ) { firstDay = 7 }
    const month = date.getMonth();
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

function generateWeekID(year, month, weekArr, weekIndex) {
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

export const timetables2018 = {};

for (let i = 0; i < 12; i++) {
    const selectedDate = new Date(2018, i);
    generateMonth(selectedDate)
        .forEach((weekArr, index) => {
            const weekID = generateWeekID(selectedDate.getFullYear(), selectedDate.getMonth(), weekArr, index);
            if (!timetables2018[weekID]) {
                timetables2018[weekID] = new Timetable()
            }
        })
}
