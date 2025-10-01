import {
  CheckPassword,
  AddData,
  GetData,
  DeleteData,
  VaultExists,
  CreateVault,
  GetBreachStatus,
} from "@shared/types";

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
      getBreachStatus: GetBreachStatus;
    };
    windowControls: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}
