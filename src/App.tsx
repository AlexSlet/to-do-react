import { useState } from "react";
import Button from "@mui/material/Button";
import ItemsModal from "./components/ItemsModal";
import "./App.scss";
import { ToDoItem } from "./interfaces";


function App() {
  const [todoList, setTodoList] = useState<ToDoItem[]>([]);
  const [todoToEdit, setTodoToEdit] = useState<ToDoItem | null>(null)

  function saveTodo(todo: ToDoItem) {
    setTodoList((prevState) => [
      ...prevState,
      { title: todo.title, description: todo.description, id: new Date().getTime() },
    ]);
    setTodoToEdit(null)
  }

  function editTodo(todo: ToDoItem) {
    const index = todoList.findIndex(item => item.id === todo.id)
    const listCopy = [...todoList]
    listCopy[index] = todo
    setTodoList(listCopy)
    setTodoToEdit(null)
  }

  function onRemove(id: number) {
    const filteredList = todoList.filter(item => item.id !== id)
    setTodoList(filteredList)
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
