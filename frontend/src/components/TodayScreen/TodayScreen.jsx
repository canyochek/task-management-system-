import "./TodayScreen.scss";
import UpcomingList from '../Upcoming/UpcomingList';
import { isToday, parseISO } from 'date-fns';

const TodayScreen = ({ tasks = [], onDeleteTask, onEditTask }) => {
    const todayTasks = tasks.filter(task => {
        if (!task.dateISO) return false;
        return isToday(parseISO(task.dateISO));
    });

    return (
        <section className="today-page">
            <h2 className="today-page__title">Сьогодні</h2>
            <UpcomingList 
                title="Сьогоднішні завдання" 
                className="today-page__content" 
                tasks={todayTasks} 
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask} 
            />    
        </section>
    );
};

export default TodayScreen;