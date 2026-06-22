const daysConfig = [
  { label: "Пн", index: 1 },
  { label: "Вт", index: 2 },
  { label: "Ср", index: 3 },
  { label: "Чт", index: 4 },
  { label: "Пт", index: 5 },
  { label: "Сб", index: 6 },
  { label: "Нд", index: 7 }
];

const WeekWorkSpace = ({ tasks = [], sidebarLists = [], currentDate, onDeleteTask }) => { 
  const getHourNumber = (timeString) => {
    if (!timeString) return 0;
    const [hours] = timeString.split(':').map(Number);
    return hours;
  };

  const getFormatString = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getLocalDateForDayIndex = (targetIndex) => {
    const baseDate = new Date(currentDate);
    const currentDay = baseDate.getDay(); 
    const currentDayIndex = currentDay === 0 ? 7 : currentDay; 

    const diff = targetIndex - currentDayIndex;
    
    const resultDate = new Date(baseDate);
    resultDate.setDate(baseDate.getDate() + diff);
    return resultDate;
  };

  return (
    <div className="week">
      <div className="week__header">
        <div className="week__header-spacer" />
        <div className="week__days-columns">
          {daysConfig.map(dayObj => {
            const dayDate = getLocalDateForDayIndex(dayObj.index);
            return (
              <div key={dayObj.label} className="week__header-day">
                {dayObj.label} ({dayDate.getDate()})
              </div>
            );
          })}
        </div>
      </div>

      <div className="week__body">
        <div className="week__hours">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="week__hour-label">
              {String(i).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        <div className="week__grid">
          {daysConfig.map(dayObj => {
            const targetColumnDate = getLocalDateForDayIndex(dayObj.index);
            const targetDateStr = getFormatString(targetColumnDate);
            const tasksForThisDay = Array.isArray(tasks)
              ? tasks.filter(task => task.dateISO === targetDateStr)
              : [];

            return (
              <div key={dayObj.label} className="week__column">
                {Array.from({ length: 24 }).map((_, hour) => {
                  const tasksInThisHour = tasksForThisDay.filter(
                    task => getHourNumber(task.time) === hour
                  );

                  return (
                    <div key={hour} className="week__cell">
                      {tasksInThisHour.map(task => {
                        const associatedList = sidebarLists.find(l => l.id === task.listId);
                        const currentColor = associatedList ? associatedList.color : '#1890ff';

                        return (
                          <div 
                            key={task._id || task.id} 
                            className="week__task-event"
                            style={{ 
                              backgroundColor: `${currentColor}20`, 
                              color: '#333',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '4px'
                            }}
                            title={`${task.text} (${task.time})`}
                          >
                            <span 
                              className="week__task-text" 
                              style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            >
                              {task.text}
                            </span>

                            <button 
                              className="week__task-delete-btn"
                              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}
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
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekWorkSpace;