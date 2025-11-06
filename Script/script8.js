const root = ReactDOM.createRoot(document.getElementById('root'));

const Task = ({children}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const textId = React.useRef();

    const handleClickEdit = () => {
        setIsEditing(true);
    }

    const handleClickRemove = () => {
        alert(`Pressed remove button for task ${children}`);
    }

    const handleClickSave = () => {
        alert(textId.current.value);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div className={'box'}>
                <textarea ref={textId} defaultValue={children}></textarea>
                <button onClick={handleClickSave} className={'btn  success'}>Save</button>
            </div>
        )
    } else {
        return (
            <div className={'box'}>
                <div>{children}</div>
                <button onClick={handleClickEdit} className={'btn light'}>Edit</button>
                <button onClick={handleClickRemove} className={'btn red'}>Remove</button>
            </div>
        )
    }
}

root.render(
    <div className={'field'}>
        <Task>My task 1</Task>
        <Task>My task 2</Task>
        <Task>My task 3</Task>
    </div>
);