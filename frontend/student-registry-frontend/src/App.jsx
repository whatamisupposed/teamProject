import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard/dashboard'
import AccountPage from './components/account/accountPage'
import Login from './components/login/login'
import Courses from './components/courses/courses'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Courses />
      </div>
      
    </>
  )
}

export default App
