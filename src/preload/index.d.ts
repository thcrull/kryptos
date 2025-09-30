import { CheckPassword, GetData } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      checkPassword: CheckPassword;
      getData: GetData;
    };
    windowControls: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}
