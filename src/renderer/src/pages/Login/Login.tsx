import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Input,
  Button,
  Title,
  ErrorText,
} from "./Login.styled";
import { useVault } from "@renderer/context/VaultContext";

const Login: React.FC = () => {
  const [inputPassword, setInputPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setData, setPassword } = useVault();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await window.context.checkPassword(inputPassword ?? "");
    if (result.isValid) {
      setData(result.data);
      setPassword(inputPassword);
      navigate("/vault");
    } else {
      setError("Invalid password. Please try again.");
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
            value={inputPassword ?? ""}
            onChange={(e) => setInputPassword(e.target.value)}
            autoFocus
          />
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit">Unlock</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
