const User = require('../models/User');
const Task = require('../models/Task');
const asyncHandler = require('express-async-handler')

// @desc Get all Tasks 
// @route GET /Tasks
// @access Private
const getAllTasks = asyncHandler(async (req, res) => {
    const Tasks = await Task.find().lean();

    if (!Tasks?.length)
        return res.status(400).json({ message: 'No Tasks found' });

    const TasksWithUser = await Promise.all(Tasks.map(async (task) => {
        const user = await User.findById(task.user).lean().exec();
        return { ...task, username: user.username };
    }))

    res.json(TasksWithUser);
})

// @desc Create new Task
// @route POST /Tasks
// @access Private
const createTask = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    if (!user || !title || !text)
        return res.status(400).json({ message: 'All fields are required' });

    const duplicate = await Task.findOne({ title }).lean().exec();
    if (duplicate)
        return res.status(409).json({ message: 'Duplicate Task title' });

    const task = await Task.create({ user, title, text });

    if (task)
        return res.status(201).json({ message: 'New Task created' });
    else
        return res.status(400).json({ message: 'Invalid Task data received' });

})

// @desc Update a Task
// @route PATCH /Tasks
// @access Private
const updateTask = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    if (!id || !user || !title || !text || typeof completed !== 'boolean')
        return res.status(400).json({ message: 'All fields are required' });

    const task = await Task.findById(id).exec();
    if (!task)
        return res.status(400).json({ message: 'Task not found' });

    const duplicate = await Task.findOne({ title }).lean().exec();

    // Allow renaming of the original task
    if (duplicate && duplicate?._id.toString() !== id)
        return res.status(409).json({ message: 'Duplicate Task title' });

    task.user = user;
    task.title = title;
    task.text = text;
    task.completed = completed;

    const updatedTask = await task.save();

    res.json(`'${updatedTask.title}' updated`);
})

// @desc Delete a Task
// @route DELETE /Tasks
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({ message: 'Task ID required' });
 
    const task = await Task.findById(id).exec();

    if (!task)
        return res.status(400).json({ message: 'Task not found' });

    const result = await task.deleteOne();

    const reply = `Task '${result.title}' with ID ${result._id} deleted`
    res.json(reply);
})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
}