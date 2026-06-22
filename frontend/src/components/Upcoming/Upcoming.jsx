import './Upcoming.scss';
import './UpcomingModal.scss';
import { useState } from 'react';
import UpcomingList from './UpcomingList';
import Modal from '../Modal/Modal';
import addIconTask from "../../assets/icons/plus-circleTask.svg";
import DatePicker from 'react-datepicker';
import { uk } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import { parseISO, format } from 'date-fns';

const hoursList = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
const Upcoming = ({ tasks = [], setTasks, onDeleteTask, token }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [taskTime, setTaskTime] = useState('09:00');
    const [startDate, setStartDate] = useState(new Date()); 
    
    const [sidebarLists, setSidebarLists] = useState(() => {
        const savedLists = localStorage.getItem('sidebar_lists');
        return savedLists ? JSON.parse(savedLists) : [];
    });
    const [selectedListId, setSelectedListId] = useState('');

    const refreshLists = (currentTask = null) => {
        const savedLists = localStorage.getItem('sidebar_lists');
        const parsedLists = savedLists ? JSON.parse(savedLists) : [];
        setSidebarLists(parsedLists);
        
        if (currentTask && currentTask.listId) {
            setSelectedListId(currentTask.listId);
        } else if (parsedLists.length > 0) {
            setSelectedListId(parsedLists[0].id); 
        } else {
            setSelectedListId('');
        }
    };

    const handleOpenEditModal = (task) => {
        setEditingTask(task); 
        setInputValue(task.text);
        setTaskTime(task.time);
        setStartDate(parseISO(task.dateISO));
        refreshLists(task);
        setIsModalOpen(true);
    };

    const handleOpenCreateModal = () => {
        setEditingTask(null); 
        setInputValue('');
        setTaskTime('09:00');
        setStartDate(new Date());
        refreshLists(null);
        setIsModalOpen(true);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const currentList = sidebarLists.find(l => l.id === selectedListId);
        const chosenColor = currentList ? currentList.color : '#1890ff';

        const taskData = {
            text: inputValue,
            time: taskTime,
            dateDisplay: format(startDate, 'dd MMM',{ locale: uk }),
            dateISO: format(startDate, 'yyyy-MM-dd'),
            listId: selectedListId, 
            color: chosenColor      
        };

        if (editingTask) {
            const taskId = editingTask._id || editingTask.id;
            try {
                const response = await fetch(`https://task-management-system-backend-wlev.onrender.com/api/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(taskData)
                });

                if (response.ok) {
                    const updatedTaskFromServer = await response.json();
                    setTasks(tasks.map(task => 
                        (task._id === taskId || task.id === taskId) ? updatedTaskFromServer : task
                    ));
                }
            } catch (error) {
                console.error("Не вдалося оновити таску:", error);
            }
        } else {
            try {
                const response = await fetch('https://task-management-system-backend-wlev.onrender.com/api/tasks', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(taskData)
                });

                if (response.ok) {
                    const savedTask = await response.json();
                    setTasks([...tasks, savedTask]);
                }
            } catch (error) {
                console.error("Не вдалося зберегти таску:", error);
            }
        }
        
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const getLocalISOString = (dateObj) => {
        return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0); 

    const todayStr = getLocalISOString(now);
    const tomorrowObj = new Date(now);
    tomorrowObj.setDate(now.getDate() + 1);
    const tomorrowStr = getLocalISOString(tomorrowObj);

    const endOfRange = new Date(now);
    endOfRange.setDate(now.getDate() + 7);
    endOfRange.setHours(23, 59, 59, 999);

    const todayTasks = tasks.filter(task => task.dateISO === todayStr);
    const tomorrowTasks = tasks.filter(task => task.dateISO === tomorrowStr);
    
    const thisWeekTasks = tasks
        .filter(task => {
            if (!task.dateISO) return false;
            if (task.dateISO === todayStr || task.dateISO === tomorrowStr) return false;
            
            const localTaskDate = new Date(task.dateISO.replace(/-/g, '/'));
            localTaskDate.setHours(0, 0, 0, 0);
            
            return localTaskDate >= now && localTaskDate <= endOfRange;
        })
        .sort((a, b) => a.dateISO.localeCompare(b.dateISO));

    return (
        <section className="upcoming">
            <h2 className="upcoming__title">Плани</h2>
            
            <div className="upcoming__tasks">
                <UpcomingList className="upcoming__list" title="Сьогодні" tasks={todayTasks} onDeleteTask={onDeleteTask} onEditTask={handleOpenEditModal} />
                <UpcomingList className="upcoming__list" title="Завтра" tasks={tomorrowTasks} onDeleteTask={onDeleteTask} onEditTask={handleOpenEditModal} />
                <UpcomingList className="upcoming__list" title="На цьому тижні" tasks={thisWeekTasks} onDeleteTask={onDeleteTask} onEditTask={handleOpenEditModal} />
            </div>

            <button className="upcoming__btn-event" onClick={handleOpenCreateModal}>
                + Додати нове завдання
            </button>

            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingTask(null); }}>
                <div onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={handleAddTask} className="upcoming__modal-form">
                        <h3 className="upcoming__modal-title">
                            {editingTask ? "Змінити завдання" : "Створити завдання"}
                        </h3>
                        
                        <input 
                            type="text" 
                            placeholder="Назва завдання" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            className="upcoming__input"
                            autoFocus
                        />

                        <div className="upcoming__modal-field">
                            <label>Обрати час:</label>
                            <select value={taskTime} onChange={(e) => setTaskTime(e.target.value)} className="upcoming__select">
                                {hoursList.map(hour => (
                                    <option key={hour} value={hour}>{hour}</option>
                                ))}
                            </select>
                        </div>

                        <div className="upcoming__modal-field">
                            <label>Обрати дату:</label>
                            <DatePicker 
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                                dateFormat="dd MMMM yyyy"
                                locale={uk}
                                className="upcoming__date-picker"
                            />
                        </div>

                        <div className="upcoming__modal-field">
                            <label>Обрати лист:</label>
                            <select 
                                value={selectedListId} 
                                onChange={(e) => setSelectedListId(e.target.value)} 
                                className="upcoming__select"
                            >
                                {sidebarLists.map(list => (
                                    <option key={list.id} value={list.id}>
                                        {list.text}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="upcoming__modal-submit">
                            <img src={addIconTask} alt="iconAdd" /> 
                            {editingTask ? "Зберегти зміни" : "Створити завдання"}
                        </button>
                    </form>
                </div>
            </Modal>
        </section>
    );
};

export default Upcoming;