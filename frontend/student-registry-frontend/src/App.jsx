import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard/dashboard';
import AccountPage from './components/account/accountPage';
import Login from './components/login/login';
import Courses from './components/courses/courses';
import Help from './components/help/help';
import Inbox from './components/inbox/inbox';
import AdminPage from './components/admin/adminPage'

function App() {
  const [activeComponent, setActiveComponent] = useState('Login');

  const handleLogout = () => {
    console.log('Logged out');
    setActiveComponent('Login');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Login':
        return <Login setActiveComponent={setActiveComponent} />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Account':
        return <AccountPage />;
      case 'Courses':
        return <Courses />;
      case 'Help':
        return <Help />;
      case 'Inbox':
        return <Inbox />;
      case 'Admin':
        return <AdminPage />;
      default:
        return <Login setActiveComponent={setActiveComponent} />;
    }
  };

  return (
      <div className="flex">
      {activeComponent !== 'Login' && <Sidebar setActiveComponent={setActiveComponent} onLogout={handleLogout} />}
      {renderComponent()}
      </div>
  );
}

export default App;
