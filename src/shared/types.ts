export type CheckPassword = (password: string) => {
  isValid: boolean;
  data: null | string;
};
export type GetData = (password: string) => Promise<string | null>;
