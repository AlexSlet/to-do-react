import { useState } from "react";
import Button from "@mui/material/Button";
import ItemsModal from "./components/ItemsModal";
import { useSelector, useDispatch } from 'react-redux'
import { addTask, editTask, deleteTask } from "./store/tasksSlice";
import { RootState } from "./store";
import "./App.scss";
import { ToDoItem } from "./interfaces";


function App() {
  const todoList = useSelector((state: RootState) => state.tasks.tasks)
  const dispatch = useDispatch()
  const [todoToEdit, setTodoToEdit] = useState<ToDoItem | null>(null)

  function saveTodo(todo: ToDoItem) {
    dispatch(addTask({ title: todo.title, description: todo.description, id: new Date().getTime() }))
    setTodoToEdit(null)
  }

  function editTodo(todo: ToDoItem) {
    dispatch(editTask(todo))
    setTodoToEdit(null)
  }

  function onRemove(id: number) {
    dispatch(deleteTask(id))
  }

  function onEdit(todo: ToDoItem) {
    setTodoToEdit(todo)
  }

  const renderList = todoList.map((todo) => {
    return (
      <li className="toDo-list--item" key={todo.id}>
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
        <div>
          <Button onClick={() => onEdit(todo)}>Edit</Button>
          <Button color="error" onClick={() => onRemove(todo.id)}>Remove</Button>
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="toDo">
        <div className="main-title">
          <h1>To-do list</h1>
          <ItemsModal todoToEdit={todoToEdit} onSave={saveTodo} onEdit={editTodo} onCancel={() => setTodoToEdit(null)}/>
        </div>
        <ul className="toDo-list">{renderList}</ul>
      </div>
    </>
  );
}

export default App;
