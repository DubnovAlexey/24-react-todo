const root = ReactDOM.createRoot(document.getElementById('root'));

const Task = ({children}) => {
    const handleClickEdit = () => {
        alert(`Pressed edit button for task ${children}`);
    }

    const handleClickRemove = () => {
        alert(`Pressed remove button for task ${children}`);
    }

    return (
        <div className={'box'}>
            <div>{children}</div>
            <button onClick={handleClickEdit} className={'btn light'}>Edit</button>
            <button onClick={handleClickRemove} className={'btn red'}>Remove</button>
        </div>
    )
}

root.render(
    <div className={'field'}>
        <Task>My task 1</Task>
        <Task>My task 2</Task>
        <Task>My task 3</Task>
    </div>
);