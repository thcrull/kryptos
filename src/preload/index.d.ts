import { CheckPassword, AddData, GetData, DeleteData, VaultExists, CreateVault } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      checkPassword: CheckPassword;
      addData: AddData;
      getData: GetData;
      deleteData: DeleteData;
      vaultExists: VaultExists;
      createVault: CreateVault;
    };
    windowControls: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}
