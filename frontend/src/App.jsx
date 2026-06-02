import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Upcoming from './components/Upcoming/Upcoming'
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
  return (
    <main className={`app-container ${isOpen ? "open" : "closed"}`}>
      <Sidebar onToggle={toggleSidebar} onToggleScreen={toggleScreen}/>
      {activeScreen === 'welcome' && <WelcomeScreen />}
      {activeScreen === 'upcoming' && <Upcoming />}
    </main>
  )
}

export default App
