import React from 'react';


export const Carousel = ({state, selectEmployee}) => 
    <div className="carousel">
        {state.employees.map(employee => 
            <div key={employee._id} 
                className={state.selectedEmployee ? state.selectedEmployee._id===employee._id ? 'selected' : '' : ''}
                onClick={() => selectEmployee(employee)}>
                {employee.name}</div>
        )}
    </div>
