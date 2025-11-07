// Создаём корневой элемент React-приложения — именно сюда React "вставит" компоненты
const root = ReactDOM.createRoot(document.getElementById('root'));

/* ---------------------------------------------------
   Компонент Task — отображает одну задачу (один элемент списка)
   --------------------------------------------------- */
const Task = ({ children, index, remove, edit }) => {
  // Локальное состояние, отвечает за то, редактируем ли мы сейчас задачу
  const [isEditing, setIsEditing] = React.useState(false);

  // useRef — создаём ссылку на <textarea>, чтобы позже прочитать значение
  const textId = React.useRef();

  // Обработчик кнопки "Edit" — включает режим редактирования
  const handleClickEdit = () => {
    setIsEditing(true);
  };

  // Обработчик кнопки "Remove" — вызывает функцию удаления из родителя
  const handleClickRemove = () => {
    remove(index); // передаём индекс задачи в функцию deleteTask()
  };

  // Обработчик кнопки "Save" — сохраняет изменения
  const handleClickSave = () => {
    edit(index, textId.current.value); // передаём индекс и новый текст
    setIsEditing(false); // возвращаемся из режима редактирования
  };

  /* 
    Условный рендеринг:
    Если isEditing === true, показываем <textarea> и кнопку "Save".
    Иначе — просто текст задачи и кнопки "Edit" и "Remove".
  */
  if (isEditing) {
    return (
      <div className="box">
        <textarea
          ref={textId}           // сохраняем ссылку на элемент
          defaultValue={children} // начальное значение — текущий текст задачи
        ></textarea>
        <button
          onClick={handleClickSave} // вызываем сохранение
          className="btn success"
        >
          Save
        </button>
      </div>
    );
  } else {
    return (
      <div className="box">
        <div>{children}</div> {/* отображаем текст задачи */}
        <button
          onClick={handleClickEdit} // включаем режим редактирования
          className="btn light"
        >
          Edit
        </button>
        <button
          onClick={handleClickRemove} // удаляем задачу
          className="btn red"
        >
          Remove
        </button>
      </div>
    );
  }
};

/* ---------------------------------------------------
   Компонент TaskList — управляет списком задач
   --------------------------------------------------- */
const TaskList = () => {
  // Состояние со списком задач
  const [tasks, setTasks] = React.useState([]);

  // Удаление задачи по индексу
  const deleteTask = (index) => {
    const newTasks = [...tasks]; // копируем массив (важно не мутировать state напрямую)
    newTasks.splice(index, 1);   // удаляем элемент
    setTasks(newTasks);          // обновляем состояние
  };

  // Редактирование задачи
  const editTask = (index, text) => {
    const newTasks = [...tasks];
    newTasks[index] = text;      // заменяем старый текст новым
    setTasks(newTasks);
  };

  // Добавление новой задачи
  const addTask = () => {
    setTasks([...tasks, 'New task']); // создаём новую копию массива с добавленной задачей
  };

  // Возвращаем JSX — интерфейс для пользователя
  return (
    <div className="field">
      {/* Кнопка добавления новой задачи */}
      <button onClick={addTask} className="btn new">Add task</button>

      {/* 
        Проходимся по массиву задач и для каждой создаём компонент Task.
        Передаём функции remove и edit (но не вызываем их — просто передаём ссылку).
      */}
      {tasks.map((t, i) => (
        <Task
          key={i}            // уникальный ключ для React
          index={i}          // индекс задачи
          remove={deleteTask} // ссылка на функцию удаления
          edit={editTask}     // ссылка на функцию редактирования
        >
          {t}                // передаём текст задачи как children
        </Task>
      ))}
    </div>
  );
};

/* ---------------------------------------------------
   Отрисовываем компонент TaskList в корневой элемент
   --------------------------------------------------- */
root.render(<TaskList />);
