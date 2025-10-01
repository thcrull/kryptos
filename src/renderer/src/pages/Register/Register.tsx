import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useVault } from "@renderer/context/VaultContext";
import Input from "@renderer/components/Input/Input";
import Button from "@renderer/components/Button/Button";
import { AlertProps } from "@shared/types";
import Alert from "@renderer/components/Alert/Alert";
import zxcvbn from "zxcvbn";
import {
  Card,
  Container,
  Form,
  StrengthBarFill,
  StrengthBarWrapper,
  StrengthContainer,
  StrengthText,
  Title,
} from "./Register.styled";

const Register: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const navigate = useNavigate();
  const { setPassword: setVaultPassword, setData } = useVault();

  const passwordStrength = useMemo(
    () => (password ? zxcvbn(password) : null),
    [password]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!password || !confirmPassword) {
      setAlert({ text: "Both fields are required.", type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ text: "Passwords do not match.", type: "error" });
      return;
    }

    if (passwordStrength && passwordStrength.score < 2) {
      setAlert({
        text: "Password is too weak. Please choose a stronger one.",
        type: "error",
      });
      return;
    }

    const success = await window.context.createVault(password);
    if (success) {
      setVaultPassword(password);
      setData([]);
      navigate("/vault");
    } else {
      setAlert({
        text: "Failed to create vault. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <Container>
      <Card>
        <Title>Create New Vault</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {passwordStrength && password && (
            <StrengthContainer>
              <StrengthBarWrapper>
                <StrengthBarFill score={passwordStrength.score} />
              </StrengthBarWrapper>
              <StrengthText score={passwordStrength.score}>
                {
                  ["Too weak", "Weak", "Fair", "Good", "Strong"][
                    passwordStrength.score
                  ]
                }
              </StrengthText>
            </StrengthContainer>
          )}

          {alert && <Alert text={alert.text} type={alert.type} />}
          <Button type="submit">Create</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
