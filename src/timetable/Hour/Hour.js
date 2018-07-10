import React from 'react';

export const Hour = ({state, removeEmployee, addEmployee, day, hourKey}) => 
    <div onClick={() => addEmployee(day, hourKey)} className={`hour ${state.timetable[day][Number(hourKey.slice(0, 2))][hourKey].indexOf(state.selectedEmployee) !== -1 ? 'containsEmployee' : ''}`}>
        {/* <div className="hour-btn" onClick={() => addEmployee(day, hourKey)}>ADD</div> */}
        <ul>
            {   
                state.timetable[day][Number(hourKey.slice(0, 2))][hourKey].map(employee => {
                    return ( 
                        employee &&
                        <li key={employee._id}  onClick={(event) => removeEmployee(employee, day, hourKey, event)}>{employee.name}</li>
                    )
                    }
                )
            }
        </ul>
    </div>