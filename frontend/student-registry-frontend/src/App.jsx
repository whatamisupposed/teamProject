import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard/dashboard'
import AccountPage from './components/account/accountPage'
import Login from './components/login/login'
import Courses from './components/courses/courses'
import Help from './components/help/help'
import Inbox from './components/inbox/inbox'

function App() {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Account':
        return <AccountPage />;
      case 'Login':
        return <Login />;
      case 'Courses':
        return <Courses />;
      case 'Help':
        return <Help />;
      case 'Inbox':
        return <Inbox />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="flex">
      <Sidebar setActiveComponent={setActiveComponent} />
      {renderComponent()}
      </div>
      
    </>
  )
}

export default App
