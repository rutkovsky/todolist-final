import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let changingTask = tasks.find(t => t.id === taskId)
        if (changingTask) {
            changingTask.isDone = isDone
        }
        setTasks([...tasks])
    }

    let [filter, setFilter] = useState<FilterValueType>('all')

    function removeTask(id: string) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    function addTask(newTaskTitle: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }

    function changeFilter(valueFilter: FilterValueType) {
        setFilter(valueFilter)
    }

    return <div className="App">
        <Todolist title="What to learn"
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}/>
    </div>;
}

export default App;