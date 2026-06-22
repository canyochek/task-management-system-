import UpcomingItem from "./UpcomingItem";
import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';

const UpcomingList = ({ title, className, tasks, onDeleteTask, onEditTask }) => {
    return (
        <div className={className}>
            <h3 className="upcoming__title">{title}</h3>
            
            <ul className="upcoming__items-list">
                {tasks && tasks.map((task, index) => {
                    const taskText = task.text || "";
                    const taskTime = task.time || "";

                    const taskDate = task.dateISO 
                        ? format(parseISO(task.dateISO), 'dd MMM', { locale: uk }) 
                        : (task.dateDisplay || "");

                    const displayInfo = title === "Сьогодні" || title === "Завтра" 
                        ? `${taskText} (${taskTime})`
                        : `${taskText} (${taskTime}, ${taskDate})`;
                        
                    const currentId = task._id || task.id || index;

                    return (
                        <UpcomingItem 
                            key={currentId} 
                            id={currentId} 
                            text={displayInfo} 
                            taskFull={task} 
                            onDelete={onDeleteTask} 
                            onEdit={onEditTask} 
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default UpcomingList;