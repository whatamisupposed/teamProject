import React, { useState } from 'react'
import AdminProfile from "./adminProfile"
import AdminUser from "./adminUser"
import CourseCreate from "./courseCreate"

function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('AdminProfile');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'AdminProfile':
        return <AdminProfile />;
      case 'AdminUser':
        return <AdminUser />;
      case 'CourseCreate':
        return <CourseCreate />;
      default:
        return <AdminProfile />;
    }
  };

  return (
    <>
        
        <div className="flex w-full m-5 ml-28">
            <div className="w-3/4">
                <h1 className="text-2xl font-bold">Admin</h1>
                <div className="h-px bg-slate-300"></div>

                {renderComponent()}
            </div>
            <div className="w-1/4 flex justify-center">
              <div className="flex flex-col mt-5 rounded-md">
                <button className="px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200" onClick={() => setActiveComponent('AdminProfile')}>Student List</button>
                <button className="px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200" onClick={() => setActiveComponent('AdminUser')}>Admin List</button>
                <button className="px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200" onClick={() => setActiveComponent('CourseCreate')}>Course Create</button>
                
              </div>
            </div>
        </div>
    </>
  )
}

export default AdminPage;
