import { useState, createContext, useContext } from "react";
import { trpcClient } from "../../shared/trpc/client";
import { AuthDataDTO } from "../../shared/dto/auth";

type AuthResult = {
  success: boolean;
  message?: string;
};

type SessionValidationResult = {
  err?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<AuthResult>;
  validateSession: () => Promise<SessionValidationResult>;
  logout: () => void;
};

const enum constants {
  AUTH_DATA = "auth_data",
  SESSION = "session",
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateSession = async (): Promise<SessionValidationResult> => {
    const authDataRaw = localStorage.getItem(constants.AUTH_DATA);
    const sessionToken = localStorage.getItem(constants.SESSION);
    if (!isAuthenticated && !authDataRaw && !sessionToken) {
      return {};
    }

    if (!authDataRaw || !sessionToken) {
      logout();
      return {
        err: "Invalid Session: No active session found",
      };
    }

    // TODO: Comm with server to validate token
    let parsedData: AuthDataDTO | null = null;
    try {
      parsedData = AuthDataDTO.parse(JSON.parse(authDataRaw));
    } catch {
      logout();
      return {
        err: "Invalid Session: Active session data could not be read",
      };
    }

    // Validate token by signing the auth data and comparing it to the token
    const isSessionValid = await trpcClient.auth.validateSessionId.query({
      sessionToken: sessionToken,
      authData: parsedData,
    });

    if (!isSessionValid) {
      logout();
      return {
        err: "Invalid Session: Active session may have been tampered with/become invalid",
      };
    }
    setIsAuthenticated(true);
    return {};
  };

  const login = async (
    username: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const response = await trpcClient.auth.login.query({
        username,
        password,
      });

      if (!response.success || !response.authData) {
        return { success: false, message: response.message ?? "Login failed" };
      }

      const parsed = AuthDataDTO.safeParse(response.authData);
      if (!parsed.success) {
        return { success: false, message: "Invalid auth data received" };
      }

      const authData = parsed.data;
      const sessionId = await trpcClient.auth.generateSessionId.query(authData);

      localStorage.setItem(constants.SESSION, sessionId);
      localStorage.setItem(
        constants.AUTH_DATA,
        JSON.stringify(response.authData)
      );

      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      const errorMessage = err.message ? err.message : "Unexpected error";
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    localStorage.removeItem(constants.AUTH_DATA);
    localStorage.removeItem(constants.SESSION);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, validateSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
