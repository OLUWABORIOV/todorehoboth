import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './ToDoList.css';

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        // Initialize tasks from localStorage if available
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addTask();
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, {
                id: uuidv4(),
                text: newTask.trim(),
                createdAt: new Date().toISOString()
            }]);
            setNewTask("");
        }
    }

    function deleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className='add-button'
                >
                    Add
                </button>
            </form>

            {tasks.length === 0 ? (
                <p className="empty-state">No tasks yet. Add a task to get started!</p>
            ) : (
                <ol>
                    {tasks.map((task, index) =>
                        <li key={task.id}>
                            <span className='text'>{task.text}</span>
                            <button
                                className='delete-button'
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>
                            <button
                                className='move-button'
                                onClick={() => moveTaskUp(index)}
                                disabled={index === 0}
                            >
                                ☝️
                            </button>
                            <button
                                className='move-button'
                                onClick={() => moveTaskDown(index)}
                                disabled={index === tasks.length - 1}
                            >
                                👇
                            </button>
                        </li>
                    )}
                </ol>
            )}
        </div>
    );
}

export default ToDoList