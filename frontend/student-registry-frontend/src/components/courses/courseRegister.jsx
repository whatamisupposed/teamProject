// courseRegister.jsx
import React from 'react';

function CourseRegister({ name, startDate, endDate, price, color }) {
  // Parse dates and validate
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();
  const isStartDateValid = !isNaN(new Date(startDate).getTime());
  const isEndDateValid = !isNaN(new Date(endDate).getTime());

  return (
    <div className="flex flex-col w-64 h-72 border-solid border-black rounded-lg m-5 shadow-xl hover:shadow-2xl">
      <div className="flex justify-between p-3 h-36 mb-2 rounded-t-lg" style={{ backgroundColor: color }}></div>
      <h1 className="mx-3">{name || 'No Name'}</h1>
      <h1 className="mx-3">${price || 'No Price'}</h1>
      <h1 className="px-3">
        {isStartDateValid ? formattedStartDate : 'Invalid start date'} - 
        {isEndDateValid ? formattedEndDate : 'Invalid end date'}
      </h1>
      <button className="font-bold m-4 p-2 border-2 border-gray-200 rounded-lg hover:bg-slate-100">
        Enroll Now
      </button>
    </div>
  );
}

export default CourseRegister;
