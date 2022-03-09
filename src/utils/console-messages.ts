const line =
  '----------------------------------------------------------------';

export const successMessage = (message: string) => {
  return `${line}\n${message}`;
};

export const successLastMessage = (message: string) => {
  return `${line}\n${message}\n${line}`;
};
