import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="text-muted mt-3">No tasks yet</p>;
  }

  return (
    <ul className="list-group mt-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
