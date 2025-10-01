import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Actions,
  Container,
  EmptyMessage,
  Field,
  FormContainer,
  Header,
  Label,
  CellWrapper,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TrashButton,
} from "./Vault.styled";
import Button from "@renderer/components/Button/Button";
import Input from "@renderer/components/Input/Input";
import Alert from "@renderer/components/Alert/Alert";
import CopyText from "@renderer/components/CopyText/CopyText";
import { useVaultData } from "@renderer/hooks/useVaultData";

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const {
    data,
    userEntry,
    setUserEntry,
    passwordEntry,
    setPasswordEntry,
    alert,
    addEntry,
    deleteEntry,
    setPassword,
    setData,
    userSearch,
    setUserSearch,
  } = useVaultData();

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

  const filteredData = data
    ?.map((entry, index) => ({ entry, originalIndex: index }))
    .filter(({ entry }) =>
      entry.user.toLowerCase().includes(userSearch?.toLowerCase() ?? "")
    );

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
            placeholder="Your username / email..."
            onChange={(e) => setUserEntry(e.target.value)}
          />
        </Field>

        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            value={passwordEntry ?? ""}
            placeholder="Your password..."
            onChange={(e) => setPasswordEntry(e.target.value)}
          />
        </Field>

        <Actions>
          <Button onClick={addEntry}>Add</Button>
        </Actions>
      </FormContainer>

      <FormContainer>
        <Field>
          <Input
            value={userSearch ?? ""}
            placeholder="Search by user..."
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </Field>
      </FormContainer>

      {filteredData && filteredData.length > 0 ? (
        <Table>
          <TableHeader>#</TableHeader>
          <TableHeader>User</TableHeader>
          <TableHeader>Password</TableHeader>
          <TableHeader>{"\u00A0"}</TableHeader>

          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <CellWrapper>
                  <span>{item.entry.user}</span>
                  <CopyText
                    sameRow
                    onClick={() => {
                      navigator.clipboard.writeText(item.entry.user);
                    }}
                  />
                </CellWrapper>
              </TableCell>
              <TableCell>
                <CellWrapper>
                  <span>
                    {visiblePasswords[index] ? item.entry.password : "••••••••"}
                  </span>
                  <CellWrapper>
                    <CopyText
                      sameRow
                      onClick={() => {
                        navigator.clipboard.writeText(item.entry.password);
                      }}
                    />
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
                  </CellWrapper>
                </CellWrapper>
              </TableCell>
              <TableCell>
                <TrashButton onClick={() => deleteEntry(item.originalIndex)}>
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
