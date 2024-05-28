import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../global.css";

const InputTodo = ({ setTodos, todos, notifySuccess, notifyError }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      notifyError("Description cannot be empty");
      return;
    }
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        const newTodo = result.todo;
        setTodos([...todos, newTodo]);
        notifySuccess(result.message);
        setDescription(""); // Clear the input field after successful submission
      } else {
        const error = await response.json();
        notifyError(error.error);
      }
    } catch (err) {
      console.error("An error occurred:", err.message);
      notifyError("An error occurred");
    }
  };

  return (
    <>
      <Form className="mt-5" onSubmit={onSubmitForm}>
        <Form.Group controlId="formTodoDescription">
          <Form.Control
            type="text"
            placeholder="Enter todo description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-2 shadow"
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="btn-custom hover"
          block
        >
          Add
        </Button>
      </Form>
    </>
  );
};

export default InputTodo;
