const Task = require('../models/Tasks'); 
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Помилка MongoDB при отриманні тасків", error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { text, time, dateDisplay, dateISO, listId } = req.body; 
        const newTask = new Task({
            text,
            time,
            dateDisplay,
            dateISO,
            listId: listId || '',
            userId: req.userId 
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: "Помилка MongoDB при створенні таски", error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, time, dateDisplay, dateISO, listId } = req.body; 
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { text, time, dateDisplay, dateISO, listId: listId || '' },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Таску не знайдено або у вас немає прав" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: "Помилка MongoDB при оновленні таски", error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Task.findOneAndDelete({ _id: id, userId: req.userId });

        if (!result) {
            return res.status(404).json({ message: "Таску не знайдено або у вас немає прав на її видалення" });
        }

        res.status(200).json({ message: "Таску успішно видалено з MongoDB" });
    } catch (error) {
        res.status(500).json({ message: "Помилка MongoDB при видаленні таски", error: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };