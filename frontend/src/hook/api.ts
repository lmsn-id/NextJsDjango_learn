//src/hook/api.ts

export const api = () => {
  const baseUrl = "http://127.0.0.1:8000/";

  const ApiBackend = (endpoint: string) => {
    if (endpoint) {
      return `${baseUrl}${endpoint}`;
    }
    return "";
  };

  return { ApiBackend };
};
