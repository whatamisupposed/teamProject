import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard/dashboard';
import AccountPage from './components/account/accountPage';
import Login from './components/login/form'; // Update import if necessary
import Courses from './components/courses/courses';
import Help from './components/help/help';
import Inbox from './components/inbox/inbox';

function App() {
  const [activeComponent, setActiveComponent] = useState('Login');

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
      default:
        return <Login setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <div className="flex">
      {activeComponent !== 'Login' && <Sidebar setActiveComponent={setActiveComponent} />}
      {renderComponent()}
    </div>
  );
}

export default App;
