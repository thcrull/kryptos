import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Title } from "./Login.styled";
import { useVault } from "@renderer/context/VaultContext";
import Input from "@renderer/components/Input/Input";
import Button from "@renderer/components/Button/Button";
import { AlertProps } from "@shared/types";
import Alert from "@renderer/components/Alert/Alert";
import { parseVaultData } from "@renderer/utils/vault";

const Login: React.FC = () => {
  const [inputPassword, setInputPassword] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setData, setPassword } = useVault();

  const [alert, setAlert] = useState<AlertProps | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    const result = await window.context.checkPassword(inputPassword);
    if (result.isValid) {
      setData(parseVaultData(result.data));
      setPassword(inputPassword);
      navigate("/vault");
    } else {
      setAlert({ text: "Invalid password. Please try again.", type: "error" });
    }
  };

  return (
    <Container>
      <Card>
        <Title>Vault Password</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Enter vault password"
            value={inputPassword ?? ""}
            onChange={(e) => setInputPassword(e.target.value)}
            autoFocus
          />
          {alert && <Alert text={alert.text} type={alert.type} />}
          <Button type="submit">Unlock</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
