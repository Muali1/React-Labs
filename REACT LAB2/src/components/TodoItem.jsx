export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span
        className={todo.completed ? "text-decoration-line-through text-muted" : ""}
        style={{ cursor: "pointer" }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}
