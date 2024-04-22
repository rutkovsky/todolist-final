import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValueType = 'all' | 'active' | 'completed'

type ToDoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksObjType = {
    [key: string]: TaskType[]
}

function App() {

    let toDoListId1 = v1()
    let toDoListId2 = v1()

    let [tasksObj, setTasksObj] = useState<TasksObjType>({
        [toDoListId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [toDoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false}
        ]
    })

    function changeTaskStatus(taskId: string, isDone: boolean, toDoListId: string) {
        let changingTask = tasksObj[toDoListId].find(t => t.id === taskId)
        if (changingTask) {
            changingTask.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }

    function removeTask(id: string, toDoListId: string) {
        tasksObj[toDoListId] = tasksObj[toDoListId].filter(t => t.id !== id)
        setTasksObj({...tasksObj})
    }

    function addTask(newTaskTitle: string, toDoListId: string) {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        tasksObj[toDoListId] = [newTask, ...tasksObj[toDoListId]]
        setTasksObj({...tasksObj})
    }

    function changeFilter(valueFilter: FilterValueType, toDoListId: string) {
        let changingToDoList = toDoLists.find(t => t.id === toDoListId)
        if (changingToDoList) {
            changingToDoList.filter = valueFilter
        }
        setToDoLists([...toDoLists])
    }

    function removeTodolist(toDoListId: string) {
        let toDoListsAfterDelete = toDoLists.filter(t => t.id !== toDoListId)
        setToDoLists(toDoListsAfterDelete)
        delete tasksObj[toDoListId]
        setTasksObj({...tasksObj})
    }

    function addTodolist(newItemTitle: string) {
        let newToDoList: ToDoListsType = {id: v1(), title: newItemTitle, filter: 'all'}
        setTasksObj({...tasksObj, [newToDoList.id]: []})
        setToDoLists([newToDoList, ...toDoLists])
    }

    let [toDoLists, setToDoLists] = useState<ToDoListsType[]>([
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'}
    ])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {toDoLists.map((tdl) => {
                let filteredTasks = tasksObj[tdl.id];
                if (tdl.filter === 'active') {
                    filteredTasks = filteredTasks.filter(t => !t.isDone)
                }
                if (tdl.filter === 'completed') {
                    filteredTasks = filteredTasks.filter(t => t.isDone)
                }
                return <Todolist
                    key={tdl.id}
                    id={tdl.id}
                    title={tdl.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tdl.filter}
                    removeTodolist={removeTodolist}/>
            })}
        </div>)
}

export default App;