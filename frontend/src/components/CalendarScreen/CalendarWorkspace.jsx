import DayWorkspace from "./DayWorkSpace";
import WeekWorkSpace from "./WeekWorkSpace";
import MonthWorkspace from "./MonthWorkspace";

const CalendarWorkspace = ({ view, tasks, sidebarLists, currentDate, onDeleteTask }) => { 

    if (view === 'week') {
        return <WeekWorkSpace tasks={tasks} sidebarLists={sidebarLists} currentDate={currentDate} onDeleteTask={onDeleteTask}/>; 
    }

    if (view === 'month') {
        return (
            <MonthWorkspace tasks={tasks} sidebarLists={sidebarLists} currentYear={currentDate.getFullYear()} currentMonth={currentDate.getMonth()} onDeleteTask= {onDeleteTask}
            />
        ); 
    }

    return <DayWorkspace tasks={tasks} sidebarLists={sidebarLists} currentDate={currentDate} />; 
};

export default CalendarWorkspace;