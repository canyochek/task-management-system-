import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import './App.scss'
const App = () => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  return (
    <main className={`app-container ${isOpen ? "open" : "closed"}`}>
      <Sidebar onToggle={toggleSidebar}/>
      <WelcomeScreen />
    </main>
  )
}

export default App
