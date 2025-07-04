export const useAuth = () => {
  // TODO: Hardcoded for now. In a real app, you'd have logic to determine
  // if the user is authenticated.
  const isAuthenticated = true;
  return { isAuthenticated };
};

export const useLogin = () => {
  // TODO: Implement login logic here
  console.log("Logging in...");
};

export const useRegister = () => {
  // TODO: Implement register logic here
  console.log("Registering...");
};

export const useLogout = () => {
  // TODO: Implement logout logic here
  console.log("Logging out...");
};
