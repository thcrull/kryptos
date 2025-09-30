import { VaultEntry } from "@renderer/context/VaultContext";

export const parseVaultData = (rawData: string[] | null): VaultEntry[] => {
  if (!rawData) return [];

  return rawData.map((item) => JSON.parse(item));
};

export const serializeVaultEntry = (entry: VaultEntry): string => {
  return JSON.stringify(entry);
};
