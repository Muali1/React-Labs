import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    onAdd(value);
    setText("");
  };

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Enter new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}
