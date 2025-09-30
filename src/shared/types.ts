export type CheckPassword = (password: string) => {
  isValid: boolean;
  data: null | string;
};
export type GetData = (password: string) => Promise<string | null>;

export type VaultItem = {
    ivBase64: string;
    ctBase64: string;
    tagBase64: string;
}