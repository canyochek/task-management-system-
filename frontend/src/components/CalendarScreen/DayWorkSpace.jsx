import TimeRow from "./TimeRow";
import EventItem from "./EventItem";

const DayWorkspace = ({ tasks, sidebarLists = [] }) => { 
    const getHourNumber = (timeString) => {
        if (!timeString) return 0;
        const [hours] = timeString.split(':').map(Number);
        return hours;
    };
    
    const localDate = new Date();
    const todayISO = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
    const dayOfWeek = localDate.toLocaleDateString('uk-UA', { weekday: 'long' });

    const todaysTasks = tasks ? tasks.filter(task => task.dateISO === todayISO) : [];

    const hoursGrid = Array.from({ length: 24 }, (_, hour) => {
        const tasksInThisHour = todaysTasks.filter(task => getHourNumber(task.time) === hour);
        
        return {
            hour,
            tasks: tasksInThisHour.map(task => {
                const associatedList = sidebarLists.find(l => l.id === task.listId);
                const taskColor = associatedList ? associatedList.color : (task.color || "#D8F1F6");

                return {
                    id: task._id || task.id,
                    title: task.text,
                    time: task.time,
                    color: taskColor
                };
            })
        };
    });

    return (
        <div className="calendar__day-wrapper">
            <h3 className="calendar__day">{dayOfWeek}</h3>
            <div className="calendar__content">
                <TimeRow />
                <div className="calendar__events-grid">
                    {hoursGrid.map(({ hour, tasks }) => (
                        <div key={hour} className="calendar__hour-row">
                            {tasks.map(event => (
                                <EventItem key={event.id} event={event} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayWorkspace;