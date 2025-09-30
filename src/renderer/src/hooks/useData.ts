export const useData = async (password: string) => {
  const response = await window.context.checkPassword(password);
};
