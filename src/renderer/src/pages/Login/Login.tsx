import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Input, Button, Title } from "./Login.styled";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRes = await window.context.checkPassword(password);

    if (passwordRes) {
      navigate("/vault");
    } else {
      console.log("Invalid password");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Password Vault</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Enter master password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <Button type="submit">Unlock</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
