export type CheckPassword = (password: string) => Promise<boolean>;
export type GetData = (password: string) => Promise<string | null>;

export type VaultItem = {
    ivBase64: string;
    ctBase64: string;
    tagBase64: string;
}