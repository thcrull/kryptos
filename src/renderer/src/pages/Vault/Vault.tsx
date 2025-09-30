import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Vault.styled";
import { useVault } from "@renderer/context/VaultContext";

const Vault: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useVault();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <S.Container>
      <S.Header>
        <h2>Your Vault</h2>
        <S.Button onClick={handleLogout}>Log out</S.Button>
      </S.Header>

      <S.List>{data}</S.List>
    </S.Container>
  );
};

export default Vault;
