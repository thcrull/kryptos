import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, Button } from "./Login.styled";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() !== "") {
      await window.context.checkPassword(password);
      navigate("/vault");
    } else {
      alert("Please enter your master password");
    }
  };

  return (
    <Container>
      <h1>Password Vault</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Enter master password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Unlock</Button>
      </Form>
    </Container>
  );
};

export default Login;
