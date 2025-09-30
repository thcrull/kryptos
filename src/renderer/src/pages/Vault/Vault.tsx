import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
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
  PasswordWrapper,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TrashButton,
} from "./Vault.styled";
import Button from "@renderer/components/Button/Button";
import Input from "@renderer/components/Input/Input";
import Alert from "@renderer/components/Alert/Alert";
import { AlertProps } from "@shared/types";
import { parseVaultData, serializeVaultEntry } from "@renderer/utils/vault";

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData, setPassword, password } = useVault();

  const [userEntry, setUserEntry] = useState<string | null>(null);
  const [passwordEntry, setPasswordEntry] = useState<string | null>(null);

  const [alert, setAlert] = useState<AlertProps | null>(null);

  const [visiblePasswords, setVisiblePasswords] = useState<{
    [key: number]: boolean;
  }>({});

  const togglePassword = (index: number) => {
    setVisiblePasswords((prev) => ({ ...prev, [index]: !prev[index] }));
  };

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
    const entry = { user: userEntry.trim(), password: passwordEntry.trim() };
    const response = await window.context.addData(
      password,
      serializeVaultEntry(entry)
    );

    if (response) {
      setUserEntry(null);
      setPasswordEntry(null);

      setAlert({ text: "Entry added successfully.", type: "success" });
      const data = await window.context.getData(password);
      if (data) setData(parseVaultData(data));

      return;
    }

    setAlert({ text: "Failed to add entry. Try again.", type: "error" });
  };

  const deleteEntry = async (index: number) => {
    // TODO: add functionality
    return index;
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

      {data && data.length > 0 ? (
        <Table>
          <TableHeader>#</TableHeader>
          <TableHeader>User</TableHeader>
          <TableHeader>Password</TableHeader>
          <TableHeader>{"\u00A0"}</TableHeader>

          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>
                <PasswordWrapper>
                  <span>
                    {visiblePasswords[index] ? item.password : "••••••••"}{" "}
                  </span>
                  <span
                    onClick={() => togglePassword(index)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {visiblePasswords[index] ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </PasswordWrapper>
              </TableCell>
              <TableCell>
                <TrashButton onClick={() => deleteEntry(index)}>
                  <FaTrash />
                </TrashButton>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      ) : (
        <EmptyMessage>Your vault is empty.</EmptyMessage>
      )}
    </Container>
  );
};

export default Vault;
