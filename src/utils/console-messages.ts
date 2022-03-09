const line = '----------------------------------------------------------------';
const errorLine = '****************************************************************';

export const successMessage = (message: string) => {
  return `${line}\n${message}`;
};

export const successLastMessage = (message: string) => {
  return `${line}\n${message}\n${line}`;
};

export const errorMessage = (err: Error) => {
  const { message, stack } = err;

  const coloredMessage = message.red;
  const coloredStack = stack.yellow;

  return `${errorLine}\n${
    'ERROR'.red.inverse
  }\nmessage: ${coloredMessage}\nstack: ${coloredStack}\n${errorLine}`;
};
