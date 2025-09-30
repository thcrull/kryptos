import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVault } from "@renderer/context/VaultContext";
import {
  Button,
  Container,
  EmptyMessage,
  Header,
  List,
  ListItem,
} from "./Vault.styled";

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData, setPassword, password } = useVault();

  const [userEntry, setUserEntry] = useState<string | null>(null);
  const [passwordEntry, setPasswordEntry] = useState<string | null>(null);

  const handleLogout = () => {
    setData(null);
    setPassword(null);
    navigate("/");
  };

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = `${userEntry}: ${passwordEntry}`;
    const response = await window.context.addData(password, data);
    if (response) {
      setUserEntry(null);
      setPasswordEntry(null);
      // show success message later
      const data = await window.context.getData(password);
      if (data) {
        setData(data);
      }
    }
  };

  return (
    <Container>
      <Header>
        <h2>Your Vault</h2>
        <Button onClick={handleLogout}>Log out</Button>
      </Header>

      <div>
        <label>User</label>
        <input
          value={userEntry ?? ""}
          onChange={(e) => setUserEntry(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={passwordEntry ?? ""}
          onChange={(e) => setPasswordEntry(e.target.value)}
        />
        <Button onClick={addEntry}>Add</Button>
      </div>

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
