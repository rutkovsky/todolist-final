import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, toDoListId: string) => void
    changeFilter: (valueFilter: FilterValueType, toDoListId: string) => void
    addTask: (newTaskTitle: string, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    changeTaskTitle: (taskId: string, newTaskTitle: string, toDoListId: string) => void
    filter: FilterValueType
    removeTodolist: (toDoListId: string) => void
    changeTodoListTitle: (newTodolistTitle: string, toDoListId: string) => void
}

export const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onClickAll = () => props.changeFilter('all', props.id)
    const onClickActive = () => props.changeFilter('active', props.id)
    const onClickCompleted = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => props.removeTodolist(props.id)
    const changeTodoListTitle = (newTodolistTitle: string) => props.changeTodoListTitle(props.id, newTodolistTitle)

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const onClickRemoveTaskHandler = () => props.removeTask(t.id, props.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    const onChangeTaskTitle = (newTaskTitle: string) => props.changeTaskTitle(t.id, newTaskTitle, props.id)

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeTaskStatusHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChange={onChangeTaskTitle}/>
                        <button onClick={onClickRemoveTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAll}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActive}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickCompleted}>Completed
                </button>
            </div>
        </div>
    )
}

