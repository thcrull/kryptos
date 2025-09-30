import { useState } from "react";
import { useVault } from "@renderer/context/VaultContext";
import { parseVaultData, serializeVaultEntry } from "@renderer/utils/vault";
import { AlertProps } from "@shared/types";

export const useVaultData = () => {
  const { data, setData, password, setPassword } = useVault();

  const [userEntry, setUserEntry] = useState<string | null>(null);
  const [passwordEntry, setPasswordEntry] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const [userSearch, setUserSearch] = useState<string | null>(null);

  const searchUser = async () => {
    if (!userSearch) {
      setAlert({ text: "user is required.", type: "error" });
    }

    // TODO: implement search
  };

  const addEntry = async () => {
    if (!userEntry?.trim() || !passwordEntry?.trim()) {
      setAlert({ text: "Both fields are required.", type: "error" });
      return false;
    }

    const entry = { user: userEntry.trim(), password: passwordEntry.trim() };
    const response = await window.context.addData(
      password,
      serializeVaultEntry(entry)
    );

    if (response) {
      setUserEntry(null);
      setPasswordEntry(null);
      setAlert({ text: "Entry added successfully.", type: "success" });
      const vaultData = await window.context.getData(password);
      if (vaultData) setData(parseVaultData(vaultData));
      return true;
    } else {
      setAlert({ text: "Failed to add entry. Try again.", type: "error" });
      return false;
    }
  };

  const deleteEntry = async (index: number) => {
    if(!data || data.length <= index || index < 0) {
      setAlert({ text: "Index out of bounds.", type: "error" });
      return false;
    }

    const response = await window.context.deleteData(index);
    console.log(response);
    if(response){
      setAlert({ text: "Entry removed successfully.", type: "success" });
      const vaultData = await window.context.getData(password);
      if(vaultData)
        setData(parseVaultData(vaultData));
      else
        setData([]);
      return true;
    } else{
      setAlert({ text: "Failed to remove entry. Try again.", type: "error" });
      return false;
    }
  };

  return {
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
    searchUser,
  };
};
