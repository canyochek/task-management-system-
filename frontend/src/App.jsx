import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Upcoming from './components/Upcoming/Upcoming'
import Today from './components/Today/Todayscreen'
import './App.scss'
const App = () => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  const [activeScreen, setActiveScreen] = useState('upcoming')
  const toggleScreen = (screenName) => {
    setActiveScreen(screenName)
  }
  const screens = {
    welcome: <WelcomeScreen />,
    upcoming: <Upcoming />,
    today: <Today />
  };
  return (
    <main className={`app-container ${isOpen ? "open" : "closed"}`}>
      <Sidebar onToggle={toggleSidebar} onToggleScreen={toggleScreen}/>
      {screens[activeScreen]}
    </main>
  )
}

export default App
