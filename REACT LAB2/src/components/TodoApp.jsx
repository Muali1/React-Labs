import { useState } from "react";
import TodoForm from "./TodoForm.jsx";
import TodoList from "./TodoList.jsx";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-wrapper card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h2 className="mb-0">To-Do App</h2>
      </div>
      <div className="card-body">
        <TodoForm onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}
