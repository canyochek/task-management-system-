import { useState } from 'react';
import './CalendarScreen.scss';
import CalendarHeader from './CalendarHeader';
import CalendarWorkspace from './CalendarWorkspace';

const CalendarScreen = ({ tasks, onDeleteTask }) => { 
    const [view, setView] = useState('day');
    const [currentDate, setCurrentDate] = useState(new Date());

    const savedLists = localStorage.getItem('sidebar_lists');
    const sidebarLists = savedLists ? JSON.parse(savedLists) : [];

    return (
        <section className="calendar">
            <CalendarHeader 
                view={view} 
                setView={setView} 
                currentDate={currentDate} 
                setCurrentDate={setCurrentDate} 
            />
            <CalendarWorkspace 
                view={view} 
                tasks={tasks} 
                sidebarLists={sidebarLists} 
                currentDate={currentDate} 
                onDeleteTask={onDeleteTask}
            /> 
        </section>
    );
};

export default CalendarScreen;