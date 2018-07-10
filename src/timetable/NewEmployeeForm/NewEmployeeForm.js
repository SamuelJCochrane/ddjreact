import React from 'react';

export const NewEmployeeForm = ({state, toggleNewEmployeeForm, submitNewEmployee, onNewEmployeeNameChange, onNewEmployeeHoursChange}) => 
    <div className="newEmployeeForm">
        <form>
            <div className="titleBar">
            <p>NEW EMPLOYEE</p>
            <span className="closeBtn" onClick={toggleNewEmployeeForm}>&times;</span>
            </div>
            <p>Name:</p>
            <input type="text" onChange={onNewEmployeeNameChange}></input>
            <p>Hours per Week:</p>
            <input type="text" onChange={onNewEmployeeHoursChange}></input>
            <button onClick={submitNewEmployee}>Add</button>
        </form>
    </div>