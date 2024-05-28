import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import InputTodo from "./components/InputTodo";
import Header from "./components/Header";

import ListTodos from "./components/ListTodos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import Footer from "./components/Footer";

const App = () => {
  const [todos, setTodos] = useState([]);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  // Function to get all todos
  const getTodos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      if (Array.isArray(jsonData)) {
        setTodos(jsonData);
      } else {
        console.error("Invalid data format: Expected an array");
        notifyError("Invalid data format: Expected an array");
      }
    } catch (err) {
      console.error("Failed to fetch todos:", err.message);
      notifyError("Failed to fetch todos");
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <Container>
        <Header />
        <Row>
          <Col>
            <InputTodo
              setTodos={setTodos}
              todos={todos}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ListTodos
              todos={todos}
              setTodos={setTodos}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
            />
          </Col>
        </Row>
        <ToastContainer />
        <Footer />
      </Container>
    </>
  );
};

export default App;
