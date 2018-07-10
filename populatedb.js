const Week = require('./server/models/week');
const Employee = require('./server/models/employee');

const mongoose = require('mongoose');
const mongoDB = 'mongodb://samcochrane:password1@ds111370.mlab.com:11370/doingdavesjob';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const employees = [
    {name: 'John', totalHours: 0, hoursWanted: 1, _id: '1'},
    {name: 'Jack', totalHours: 0, hoursWanted: 50, _id: '2'},
    {name: 'Jacob', totalHours: 0, hoursWanted: 32, _id: '3'},
    {name: 'Jane', totalHours: 0, hoursWanted: 45, _id: '4'},
    {name: 'Jill', totalHours: 0, hoursWanted: 40, _id: '5'},
    {name: 'Janus', totalHours: 0, hoursWanted: 77, _id: '6'},
    {name: 'Jort', totalHours: 0, hoursWanted: 35, _id: '7'},
  ]

employees.forEach(employee => {
    const newEmployee = new Employee({name: employee.name, hoursWanted: employee.hoursWanted})
    newEmployee.save(err => {
        console.log(err)
    })
})

// const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
// const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ];
// const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
// const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// const dayTemplate = [
//     {'00:00': []},
//     {'01:00': []},
//     {'02:00': []},
//     {'03:00': []},
//     {'04:00': []},
//     {'05:00': []},
//     {'06:00': []},
//     {'07:00': []},
//     {'08:00': []},
//     {'09:00': []},
//     {'10:00': []},
//     {'11:00': []},
//     {'12:00': []},
//     {'13:00': []},
//     {'14:00': []},
//     {'15:00': []},
//     {'16:00': []},
//     {'17:00': []},
//     {'18:00': []},
//     {'19:00': []},
//     {'20:00': []},
//     {'21:00': []},
//     {'22:00': []},
//     {'23:00': []},
//   ]

// function generateMonth(date) {
//     //TODO: Add capabality for leap year
//     let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//     //Date object week starts with sunday as 0. Here reassigning first day to 7 if 0.
//     if (firstDay === 0 ) { firstDay = 7 }
//     const month = date.getMonth();
//     //Creates an array of numbers from 0 to 
//     const daysArr = Array.apply(null, {length: daysInMonth[month] + 1}).map(Number.call, Number);
//     daysArr.shift();

//     if ( firstDay > 1 ) {
//         const previousMonth = month === 0 ? 11 : month-1;
//         const previousMonthDays = daysInMonth[previousMonth];
//         const previousMonthDaysArr = Array.apply(null, {length: previousMonthDays + 1}).map(Number.call, Number);
//         previousMonthDaysArr.shift();
//         for (let i = 1; i < firstDay; i++) {
//             daysArr.unshift(previousMonthDaysArr[previousMonthDaysArr.length -i])
//         }
//     }
//     const daysInWeek = 7;
//     let totalDaysDisplayed;
    
//     daysArr.length > 35 ? totalDaysDisplayed = 42 : totalDaysDisplayed = 35;

//     const daysLeft = totalDaysDisplayed - daysArr.length;
//     for (let i = 1; i < daysLeft + 1 ; i++) {
//         daysArr.push(i);
//     }

//     const daysInWeeksArr = []
//     for (let i = 0; i < totalDaysDisplayed; i = i + daysInWeek ) {
//         daysInWeeksArr.push(daysArr.slice(i, i+daysInWeek));
//     }

//     return daysInWeeksArr
//   }

// function generateWeekID(year, month, weekArr, weekIndex) {
//     let weekID = `${year}`
//     if (weekIndex === 0) {
//         // If monday of first week is in previous month
//         if (weekArr[0] > 20) {
//             let newMonth = month > 0 ? month - 1 : 11;
//             weekID = `${weekID}-${newMonth}-${weekArr[0]}-${month}-${weekArr[6]}`;
//             return weekID
//         }
//         else {
//             weekID = `${weekID}-${month}-${weekArr[0]}-${month}-${weekArr[6]}`;
//             return weekID;
//         }
//     }
//     else if (weekIndex === 4 || weekIndex === 5) {
//         if (weekArr[6] < 20) {
//             let newMonth = month < 11 ? month + 1 : 0;
//             weekID = `${weekID}-${month}-${weekArr[0]}-${newMonth}-${weekArr[6]}`;
//             return weekID;
//         }
//         else {
//             weekID = `${weekID}-${month}-${weekArr[0]}-${month}-${weekArr[6]}`;
//             return weekID; 
//         }
//     }
//     else {
//         weekID = `${weekID}-${month}-${weekArr[0]}-${month}-${weekArr[6]}`;
//         return weekID;
//     }
// }

// const timetables2018 = {};
// const weekIDs = []

// for (let i = 0; i < 12; i++) {
//     const selectedDate = new Date(2018, i);
//     generateMonth(selectedDate)
//         .forEach((weekArr, index) => {
//             const weekID = generateWeekID(selectedDate.getFullYear(), selectedDate.getMonth(), weekArr, index);
//             if (weekIDs.indexOf(weekID) === -1) {
//                 weekIDs.push(weekID);
//                 const week = new Week({
//                     weekID: weekID,
//                     monday: [...dayTemplate],
//                     tuesday: [...dayTemplate],
//                     wednesday: [...dayTemplate],
//                     thursday: [...dayTemplate],
//                     friday: [...dayTemplate],
//                     saturday: [...dayTemplate],
//                     sunday: [...dayTemplate],
//                 })
//                 console.log(week)
//                 week.save(err => {
//                     if (err) {console.log(err)};
//                 })
//             }
//         })
// }

// console.log(weekIDs)
// console.log(weekIDs.length)
