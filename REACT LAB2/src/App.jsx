import UsersList from "./components/UsersList.jsx";
import TodoApp from "./components/TodoApp.jsx";

export default function App() {
  return (
    <div className="min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center mb-5" style={{ 
          color: '#333333',
          fontWeight: 600,
          fontSize: '2rem'
        }}>Task 2</h1>

        {/* To-Do App */}
        <TodoApp />

        <hr className="my-5" style={{ borderColor: '#e0e0e0' }} />

        {/* Users List */}
        <div className="mb-5">
          <UsersList />
        </div>
      </div>
    </div>
  );
}
