import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import EditTodo from "./EditTodo";
import "../global.css";

const ListTodos = ({ todos, setTodos, notifySuccess, notifyError }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.todo_id !== id));
        notifySuccess("Todo deleted successfully!");
      } else {
        notifyError("Failed to delete todo");
      }
    } catch (err) {
      console.error("Failed to delete todo:", err.message);
      notifyError("An error occurred");
    }
  };

  // Calculate the current todos to display
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Calculate the page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Table striped bordered hover className="mt-5 text-center shadow">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentTodos) && currentTodos.length > 0 ? (
            currentTodos.map((todo) => (
              <tr key={todo.todo_id} className="hover">
                <td>{todo.description}</td>
                <td>
                  <EditTodo
                    todo={todo}
                    setTodos={setTodos}
                    todos={todos}
                    notifySuccess={notifySuccess}
                    notifyError={notifyError}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                    className="btn-custom hover"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No todos available</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination className="justify-content-center mt-3">
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default ListTodos;
