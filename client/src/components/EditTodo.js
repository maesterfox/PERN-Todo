import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "../global.css";
const EditTodo = ({ todo, setTodos, todos, notifySuccess, notifyError }) => {
  const [description, setDescription] = useState(todo.description);
  const [show, setShow] = useState(false);

  // Handle modal show/hide
  const handleClose = () => {
    setDescription(todo.description);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // Update description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const updatedTodo = result.todo;
        setTodos(
          todos.map((t) => (t.todo_id === todo.todo_id ? updatedTodo : t))
        );
        notifySuccess(result.message);
        handleClose();
      } else {
        const error = await response.json();
        notifyError(error.error);
      }
    } catch (err) {
      console.error("Failed to update todo:", err.message);
      notifyError("An error occurred");
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn-custom hover"
      >
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTodoDescription">
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 shadow"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-custom hover"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="btn-custom hover"
            onClick={updateDescription}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTodo;
