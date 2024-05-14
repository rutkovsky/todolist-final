import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>('')

    function onChangeInputHandler (e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function onEditMode() {
        setTitle(props.title)
        setEditMode(true)
    }

    function offEditMode() {
        props.onChange(title)
        setEditMode(false)
    }

    return (
        editMode ?
            <input onBlur={offEditMode}
                   type="text"
                   value={title}
                   onChange={onChangeInputHandler}
                   autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}