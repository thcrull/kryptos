export type CheckPassword = (password: string) => Promise<boolean>;
export type GetData = (password: string) => Promise<string | null>;
