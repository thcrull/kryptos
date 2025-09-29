import { CheckPassword } from "@shared/types";

declare global {
  interface Window {
    context: {
      locale: string;
      checkPassword: CheckPassword;
    };
    windowControls: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}
