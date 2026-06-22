import { useEffect, useRef } from 'react';

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const monthNames = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
];

const MonthWorkspace = ({ tasks, sidebarLists = [], currentYear, currentMonth, onDeleteTask }) => { 
    const containerRef = useRef(null);
    const renderMonthsRange = [];
    for (let i = -60; i <= 60; i++) {
        const targetDate = new Date(currentYear, currentMonth + i, 1);
        renderMonthsRange.push({
            year: targetDate.getFullYear(),
            month: targetDate.getMonth(),
            isCurrent: i === 0 
        });
    }

    useEffect(() => {
        if (containerRef.current) {
            const currentMonthElement = containerRef.current.querySelector('.month__scroll-section--current');
            if (currentMonthElement) {
                currentMonthElement.scrollIntoView({ block: 'start', behavior: 'auto' });
            }
        }
    }, [currentMonth]);

    const isTaskOnDay = (dateString, day, month, year) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day
        );
    };

return (
        <div className="month">
            <div className="month__weekdays">
                {weekdays.map(day => <span key={day} className="month__weekday">{day}</span>)}
            </div>
            
            <div className="month__scrollable-grid-container" ref={containerRef}>
                {renderMonthsRange.map(({ year, month, isCurrent }) => {
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                    return (
                        <div key={`${year}-${month}`} className={`month__scroll-section ${isCurrent ? 'month__scroll-section--current' : ''}`}>
                            <h4 className="month__inner-title">{monthNames[month]} {year}</h4>

                            <div className="month__grid">
                                {days.map(day => {
                                    const tasksForThisDay = tasks
                                        ? tasks.filter(task => isTaskOnDay(task.dateISO, day, month, year))
                                        : [];

                                    return (
                                        <div key={day} className="month__cell">
                                            <span className="month__day-number">{day}</span>
                                            <div className="month__cell-tasks">
                                                {tasksForThisDay.map(task => {
                                                    const associatedList = sidebarLists.find(l => l.id === task.listId);
                                                    const currentColor = associatedList ? associatedList.color : (task.color || '#D8F1F6');

                                                    return (
                                                        <div 
                                                            key={task._id || task.id} 
                                                            className="month__task-badge"
                                                            title={task.text}
                                                            style={{ 
                                                                backgroundColor: currentColor,
                                                                borderLeft: `3px solid ${currentColor}`,
                                                                color: '#333'
                                                            }}
                                                        >
                                                            <span className="month__task-text">{task.text}</span>
                                                            <button 
                                                                className="month__task-delete-btn"
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); 
                                                                    if (window.confirm(`Видалити таску "${task.text}"?`)) {
                                                                        onDeleteTask(task._id || task.id);
                                                                    }
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthWorkspace;