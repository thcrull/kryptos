export type CheckPassword = (password: string | null) => Promise<{
  isValid: boolean;
  data: null | string[];
}>;

export type AddData = (
  password: string | null,
  newData: string
) => Promise<boolean>;

export type GetData = (password: string | null) => Promise<null | string[]>;

export type VaultItem = {
  ivBase64: string;
  ctBase64: string;
  tagBase64: string;
};

export type AlertProps = {
  text: string;
  type?: "error" | "success" | "info";
};
