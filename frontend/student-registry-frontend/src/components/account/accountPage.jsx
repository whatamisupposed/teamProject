import React, { useState } from 'react'
import Profile from "./profile"
import Security from "./security"
import Fees from "./feesandhours"

function AccountPage() {
  const [activeComponent, setActiveComponent] = useState('Fees');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Profile':
        return <Profile />;
      case 'Security':
        return <Security />;
      case 'Fees':
        return <Fees />;
      default:
        return <Profile />;
    }
  };

  return (
    <>
        
        <div className="flex w-full m-5 ml-28">
            <div className="w-3/4">
                <h1 className="text-2xl font-bold">Account</h1>
                <div className="h-px bg-slate-300"></div>

                {renderComponent()}
            </div>
            <div className="w-1/4 flex justify-center">
              <div className="flex flex-col mt-5 rounded-md">
                <button className="px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200" onClick={() => setActiveComponent('Profile')}>Profile</button>
                <button className="px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200" onClick={() => setActiveComponent('Security')}>Security</button>
                <button className="px-4 py-2 font-bold bg-slate-50 hover:bg-slate-200" onClick={() => setActiveComponent('Fees')}>Fees & Hours</button>
                
              </div>
            </div>
        </div>
    </>
  )
}

export default AccountPage;
