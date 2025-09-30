import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Vault.styled";

const Vault: React.FC = () => {
  const navigate = useNavigate();

  const data = window.context.getData(password);

  const handleLogout = () => {
    // TODO: clear session, memory, etc.
    navigate("/");
  };

  const entries = [
    { id: 1, service: "Gmail", username: "you@gmail.com" },
    { id: 2, service: "GitHub", username: "youruser" },
  ];

  return (
    <S.Container>
      <S.Header>
        <h2>Your Vault</h2>
        <S.Button onClick={handleLogout}>Log out</S.Button>
      </S.Header>

      <S.List>
        {entries.map((entry) => (
          <S.Item key={entry.id}>
            <strong>{entry.service}</strong>
            <span>{entry.username}</span>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default Vault;
