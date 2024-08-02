// courseRegister.jsx
import React from 'react';

function CourseRegister({ name, startDate, endDate, price, subjectArea }) {
  // Parse dates and validate
  const formattedStartDate = new Date(startDate).toLocaleDateString();
  const formattedEndDate = new Date(endDate).toLocaleDateString();
  const isStartDateValid = !isNaN(new Date(startDate).getTime());
  const isEndDateValid = !isNaN(new Date(endDate).getTime());

  return (
    <div className="flex flex-col w-64 h-64 border-solid border-black rounded-lg m-5 shadow-xl hover:shadow-2xl">
      <div className="flex justify-between p-3 h-32 mb-2 bg-red-600 rounded-t-lg">
        <div></div>
        {/* Use an appropriate icon */}
      </div>
      <div className="flex justify-between">
        <h1 className="mx-3">{name || 'No Name'}</h1>
        <h1 className="mx-3">${price || 'No Price'}</h1>
      </div>
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
