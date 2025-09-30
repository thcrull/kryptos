import { CheckPassword, AddData, GetData } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      checkPassword: CheckPassword;
      addData: AddData;
      getData: GetData;
    };
    windowControls: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}
