import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Upcoming from './components/Upcoming/Upcoming';
import TodayScreen from './components/TodayScreen/TodayScreen';
import CalendarScreen from './components/CalendarScreen/CalendarScreen';
import SignIn from './components/SignIn/SignIn'; 
import './App.scss';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeScreen, setActiveScreen] = useState('upcoming');
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [token, setToken] = useState(localStorage.getItem('token') || '');

 useEffect(() => {
  const fetchTasks = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://task-management-system-backend-wlev.onrender.com/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Помилка при отриманні тасків');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Бекенд недоступний, пробуємо знайти в localStorage:", error);
      const savedTasks = localStorage.getItem('user_tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } finally {
      setLoading(false); 
    }
  };

  fetchTasks();
  }, [token]);

  useEffect(() => {
    if (!loading && token) {
      localStorage.setItem('user_tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading, token]);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setLoading(true); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_tasks'); 
    setToken('');
    setTasks([]);
  };

  const handleDeleteTask = async (id) => {
    if (!id) {
      console.error("Немає ID для видалення таски");
      return;
    }

    try {
      const response = await fetch(`https://task-management-system-backend-wlev.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Не вдалося видалити таску з бази даних через сервер');
      }

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id && task._id !== id));
      console.log(`Таску з ID ${id} успішно видалено з SQL Server!`);
    } catch (error) {
      console.error("Помилка під час видалення з сервера, видаляємо локально:", error);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id && task._id !== id));
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleScreen = (screenName) => setActiveScreen(screenName);

  const renderScreen = () => {
    if (loading) {
      return <div style={{padding: "20px", color: "white"}}>Loading tasks...</div>;
    }

    switch (activeScreen) {
      case 'upcoming':
        return <Upcoming tasks={tasks} setTasks={setTasks} onDeleteTask={handleDeleteTask} token={token} />;
      case 'today':
        return <TodayScreen tasks={tasks} onDeleteTask={handleDeleteTask} token={token} />;
      case 'calendar':
        return <CalendarScreen tasks={tasks} onDeleteTask={handleDeleteTask}/>;
      default:
        return <Upcoming tasks={tasks} setTasks={setTasks} onDeleteTask={handleDeleteTask} token={token} />;
    }
  };

  return (
    <>
      {!token ? (
        <SignIn onLoginSuccess={handleLoginSuccess} />
      ) : (
        <main className={`app-container ${isOpen ? "open" : "closed"}`}>
          <Sidebar onToggle={toggleSidebar} onToggleScreen={toggleScreen} onLogout={handleLogout}/>
          {renderScreen()}
        </main>
      )}
    </>
  );
};

export default App;