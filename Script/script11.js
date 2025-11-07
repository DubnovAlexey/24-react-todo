const root = ReactDOM.createRoot(document.getElementById('root'));

/* ---------------------------------------------------
   --------------------------------------------------- */
const Task = ({ task, index, toggleDone, remove, edit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const textRef = React.useRef();

  const handleSave = () => {
    const newText = textRef.current.value.trim();
    setIsEditing(false);
  };

  return (
      {isEditing ? (
        <>
          <textarea ref={textRef} defaultValue={task.text}></textarea>
        </>
      ) : (
        <>
          <div className="task-row">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(index)}
              />
          <div className="timestamp">
            <small>Создано: {task.created}</small>
          </div>
          <div className="buttons">
          </div>
        </>
      )}
    </div>
  );
};

/* ---------------------------------------------------
   Компонент TrashTask — элемент в корзине
   --------------------------------------------------- */
const TrashTask = ({ task, index, restore, removeForever }) => {
  return (
    <div className="box deleted">
      <div className="task-text">
        {task.text}
        <div className="timestamp">
          <small>Удалено: {task.deleted}</small>
          <br />
          <small>Создано: {task.created}</small>
        </div>
      </div>
      <div className="buttons">
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   Главный компонент TaskList — управление задачами и корзиной
   --------------------------------------------------- */
const TaskList = () => {
  const [tasks, setTasks] = React.useState([]);
  const [deletedTasks, setDeletedTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all | active | done
  const [showTrash, setShowTrash] = React.useState(false);

  React.useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const savedDeleted = JSON.parse(localStorage.getItem('deletedTasks'));
    if (savedTasks) setTasks(savedTasks);
    if (savedDeleted) setDeletedTasks(savedDeleted);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
  }, [tasks, deletedTasks]);

  const formatDateTime = () => new Date().toLocaleString();

  // ➕ Добавить задачу
  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    setTasks([...tasks, { text, done: false, created: formatDateTime() }]);
    setNewTask('');
  };

  // 🗑 Удалить задачу в корзину
  const deleteTask = (index) => {
    const task = tasks[index];
    setDeletedTasks([...deletedTasks, { ...task, deleted: formatDateTime() }]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const restoreTask = (index) => {
    const task = deletedTasks[index];
    setTasks([...tasks, { ...task, deleted: undefined }]);
    setDeletedTasks(deletedTasks.filter((_, i) => i !== index));
  };

  // ❌ Удалить навсегда
  const removeForever = (index) => {
    setDeletedTasks(deletedTasks.filter((_, i) => i !== index));
  };

  const editTask = (index, text) => {
    const newTasks = [...tasks];
    newTasks[index].text = text;
    setTasks(newTasks);
  };

  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  // 📊 Статистика
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const remaining = total - completed;
  const deletedCount = deletedTasks.length;

  const filteredTasks = tasks.filter(t =>
    filter === 'all' ? true :
      filter === 'active' ? !t.done :
        t.done
  );

  return (
    <div className="field">
      <h2>Мой список задач</h2>

      <div className="toggle-view">
        <button
          onClick={() => setShowTrash(false)}
        >
          Задачи
        </button>
        <button
          onClick={() => setShowTrash(true)}
        >
          Корзина ({deletedCount})
        </button>
      </div>

      {!showTrash ? (
        <>
          {/* Добавление новой задачи */}
          <div className="add-section">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Введите новую задачу..."
              className="input"
            />
          </div>

          <div className="filter">
            <button
              onClick={() => setFilter('all')}
            <button
              onClick={() => setFilter('active')}
            <button
              onClick={() => setFilter('done')}
          </div>

          {/* Статистика */}
          <div className="stats">
            <span>Всего: {total}</span>
            <span>Выполнено: {completed}</span>
            <span>Осталось: {remaining}</span>
            <span>В корзине: {deletedCount}</span>
          </div>

          {/* Список задач */}
          {filteredTasks.length === 0 ? (
              <p>Нет задач 🤔</p>
          ) : (
            filteredTasks.map((task, i) => (
              <Task
                key={i}
                index={i}
                task={task}
                toggleDone={toggleDone}
                remove={deleteTask}
                edit={editTask}
              />
            ))
          )}
        </>
      ) : (
        <>
          <h3>Корзина</h3>
          {deletedTasks.length === 0 ? (
            <p>Корзина пуста 🧹</p>
          ) : (
                <TrashTask
                  key={i}
                  index={i}
                  task={task}
                  restore={restoreTask}
                  removeForever={removeForever}
                />
          )}
        </>
      )}
    </div>
  );
};

/* ---------------------------------------------------
   Отрисовка приложения
   --------------------------------------------------- */
root.render(<TaskList />);
