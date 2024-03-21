import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')

    function removeTask(id: number) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
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
                  changeFilter={changeFilter}/>
    </div>;
}

export default App;