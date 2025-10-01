import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Title,
  StrengthContainer,
  StrengthText,
  StrengthBarWrapper,
  StrengthBarFill
} from "./Login.styled";
import { useVault } from "@renderer/context/VaultContext";
import Input from "@renderer/components/Input/Input";
import Button from "@renderer/components/Button/Button";
import { AlertProps } from "@shared/types";
import Alert from "@renderer/components/Alert/Alert";
import { parseVaultData } from "@renderer/utils/vault";
import zxcvbn from "zxcvbn";

const Login: React.FC = () => {
  const [inputPassword, setInputPassword] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setData, setPassword } = useVault();

  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [vaultExists, setVaultExists] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const exists = await window.context.vaultExists();
      setVaultExists(exists);
    };
    check();
  }, []);

  const passwordStrength =
      vaultExists === false && inputPassword
          ? zxcvbn(inputPassword)
          : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!inputPassword) {
      setAlert({ text: "Password cannot be empty", type: "error" });
      return;
    }

    if (vaultExists) {
      const result = await window.context.checkPassword(inputPassword);
      if (result.isValid) {
        setData(parseVaultData(result.data));
        setPassword(inputPassword);
        navigate("/vault");
      } else {
        setAlert({ text: "Invalid password. Please try again.", type: "error" });
      }
    } else {
      const success = await window.context.createVault(inputPassword);
      if (success) {
        setPassword(inputPassword);
        setData([]);
        setVaultExists(true);
        navigate("/vault");
      } else {
        setAlert({ text: "Failed to create vault. Please try again.", type: "error" });
      }
    }
  };

  return (
    <Container>
      <Card>
        <Title>{vaultExists ? "Vault Password" : "Create Vault Password"}</Title>
        <Form onSubmit={handleSubmit}>
          <Input
              type="password"
              placeholder="Enter vault password"
              value={inputPassword ?? ""}
              onChange={(e) => setInputPassword(e.target.value)}
              autoFocus
          />
          {vaultExists === false && passwordStrength && (
              <StrengthContainer>
                <StrengthBarWrapper>
                  <StrengthBarFill score={passwordStrength.score} />
                </StrengthBarWrapper>
                <StrengthText score={passwordStrength.score}>
                  {["Too weak", "Weak", "Fair", "Good", "Strong"][passwordStrength.score]}
                </StrengthText>
              </StrengthContainer>
          )}
          {alert && <Alert text={alert.text} type={alert.type} />}
          <Button type="submit">{vaultExists ? "Unlock" : "Create Vault"}</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
