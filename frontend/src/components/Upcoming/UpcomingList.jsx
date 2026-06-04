import UpcomingItem from "./UpcomingItem";
import addIconTask from "../../assets/icons/plus-circleTask.svg";
import { useState } from "react";
const UpcomingList = ({title, className}) => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleAddTask = (e) => {
        e.preventDefault()
        if (!inputValue.trim()) return;

        const newTask = {
            key: Date.now(),
            text: inputValue
        }
        setTasks([...tasks, newTask]);
        setInputValue('');
    }
    
    return (
        <>
            <div className={className}>
                <h3 className="upcoming__title">{title}</h3>
                <form onSubmit={handleAddTask} className="upcoming__form">
                    <button type="submit"><img src={addIconTask} alt="iconAdd" /></button>
                    <input type="text" placeholder="Add new task" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="upcoming__input"/>
                </form>
                <ul className="upcoming__items-list">
                    {tasks.map(task => (
                        <UpcomingItem key={task.id} text={task.text} />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default UpcomingList