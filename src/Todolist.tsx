import React, {useState} from 'react';
import {FilterValueType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (valueFilter: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
}

export const Todolist = (props: PropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState('')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" value={newTaskTitle} onChange={(e)=>{setNewTaskTitle(e.currentTarget.value)}}/>
                <button onClick={()=>{props.addTask(newTaskTitle)}}>+</button>
            </div>
            <ul>
                {props.tasks.map(t =>
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>{props.removeTask(t.id)}}>x</button>
                    </li>)}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}