import { useState } from "react";
import Button from "@mui/material/Button";
import ItemsModal from "./components/ItemsModal";
import "./App.scss";

function App() {
  const [todoList, setTodoList] = useState([]);

  function saveTodo(title: string, description: string) {
    console.log(title, description);
    
  }

  return (
    <>
      <div className="toDo">
        <div className="main-title">
          <h1>To-do list</h1>
          <ItemsModal onSave={saveTodo}/>
        </div>
        <ul className="toDo-list">
          <li className="toDo-list--item">
            <div>
              <h3>Do this</h3>
              <p>description</p>
            </div>
            <div>
              <Button>Edit</Button>
              <Button color="error">Remove</Button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
