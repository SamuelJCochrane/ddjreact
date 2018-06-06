import React from 'react';

export const Hour = ({state, removeEmployee, addEmployee, day, hourKey}) => 
    <div className={`hour ${state.timetable[day][Number(hourKey.slice(0, 2))][hourKey].indexOf(state.selectedEmployee) !== -1 ? 'containsEmployee' : ''}`}>
        <button className="btn" onClick={() => addEmployee(day, hourKey)}>ADD</button>
        <ul>
            {   
                state.timetable[day][Number(hourKey.slice(0, 2))][hourKey].map(employee => {
                    return ( 
                        employee &&
                        <li key={employee._id}  onClick={() => removeEmployee(employee, day, hourKey)}>{employee.name}</li>
                    )
                    }
                )
            }
        </ul>
    </div>