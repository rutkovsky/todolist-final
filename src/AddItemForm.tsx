import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (newItemTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [newItemTitle, setNewItemTitle] = useState('')

    const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.charCode === 13) {
            props.addItem(newItemTitle);
            setNewItemTitle('')
        }
    }

    let [error, setError] = useState(false)

    const onClickAddTaskHandler = () => {
        if (newItemTitle.trim() !== '') {
            props.addItem(newItemTitle.trim())
            setNewItemTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <input type="text"
                   value={newItemTitle}
                   onChange={onChangeNewTaskTitleHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={onClickAddTaskHandler}>+</button>
            {error && <div className="error-message">Field is required!</div>}
        </div>
    )
}