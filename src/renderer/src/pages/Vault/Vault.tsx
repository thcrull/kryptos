import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVault } from "@renderer/context/VaultContext";
import {
  Actions,
  Container,
  EmptyMessage,
  Field,
  FormContainer,
  Header,
  Label,
  List,
  ListItem,
} from "./Vault.styled";
import Button from "@renderer/components/Button/Button";
import Input from "@renderer/components/Input/Input";
import Alert from "@renderer/components/Alert/Alert";
import { AlertProps } from "@shared/types";

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData, setPassword, password } = useVault();

  const [userEntry, setUserEntry] = useState<string | null>(null);
  const [passwordEntry, setPasswordEntry] = useState<string | null>(null);

  const [alert, setAlert] = useState<AlertProps | null>(null);

  const handleLogout = () => {
    setData(null);
    setPassword(null);
    navigate("/");
  };

  const addEntry = async (e: React.FormEvent) => {
    if (
      !userEntry ||
      !passwordEntry ||
      userEntry.trim() === "" ||
      passwordEntry.trim() === ""
    ) {
      setAlert({ text: "Both fields are required.", type: "error" });
      return;
    }

    e.preventDefault();
    const data = `${userEntry}: ${passwordEntry}`;
    const response = await window.context.addData(password, data);
    if (response) {
      setUserEntry(null);
      setPasswordEntry(null);

      setAlert({ text: "Entry added successfully.", type: "success" });
      const data = await window.context.getData(password);
      if (data) setData(data);

      return;
    }

    setAlert({ text: "Failed to add entry. Try again.", type: "error" });
  };

  return (
    <Container>
      <Header>
        <h2>Your Vault</h2>
        <Button onClick={handleLogout}>Log out</Button>
      </Header>

      {alert && <Alert text={alert.text} type={alert.type} />}

      <FormContainer>
        <Field>
          <Label>User</Label>
          <Input
            value={userEntry ?? ""}
            onChange={(e) => setUserEntry(e.target.value)}
          />
        </Field>

        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            value={passwordEntry ?? ""}
            onChange={(e) => setPasswordEntry(e.target.value)}
          />
        </Field>

        <Actions>
          <Button onClick={addEntry}>Add</Button>
        </Actions>
      </FormContainer>

      <List>
        {data && data.length > 0 ? (
          data.map((item: string, index: number) => (
            <ListItem key={index}>
              <span>{index + 1}.</span> {item}
            </ListItem>
          ))
        ) : (
          <EmptyMessage>Your vault is empty.</EmptyMessage>
        )}
      </List>
    </Container>
  );
};

export default Vault;
