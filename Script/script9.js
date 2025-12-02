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

const TaskList = () => {
    const [tasks, setTasks] = React.useState(['My task 1', 'My task 2', 'My task 3']);

    const deleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    const ediTask = (index, text) => {
        const newTasks = [...tasks];
        newTasks[index] = text;
        setTasks(newTasks);
    }

    const addTask = () => {
        setTasks([...tasks, 'New task']);
    }

    return (
        <div className={'field'}>
            {tasks.map((t, i) => <Task key={i + 1}>{t}</Task>)}
        </div>
    )
}

root.render(
    <TaskList/>
);