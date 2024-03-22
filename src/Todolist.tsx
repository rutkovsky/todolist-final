import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState(false)
    const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }
    const onClickAll = () => props.changeFilter('all')
    const onClickActive = () => props.changeFilter('active')
    const onClickCompleted = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"
                       value={newTaskTitle}
                       onChange={onChangeNewTaskTitleHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className="error-message">Field is required!</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickRemoveTaskHandler = () => props.removeTask(t.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
                    return <li key={t.id}>
                        <input type="checkbox"
                               onChange={onChangeTaskStatusHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickRemoveTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onClickAll}>All</button>
                <button onClick={onClickActive}>Active</button>
                <button onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
}