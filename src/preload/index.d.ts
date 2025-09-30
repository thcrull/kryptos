import { CheckPassword, AddData, GetData, DeleteData } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      checkPassword: CheckPassword;
      addData: AddData;
      getData: GetData;
      deleteData: DeleteData;
    };
    windowControls: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}
