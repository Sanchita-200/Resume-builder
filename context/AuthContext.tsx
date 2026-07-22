"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types/auth";

const AUTH_STORAGE_KEY = "ai_resume_builder_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Hydrate user session from localStorage on initial render
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to load auth session from localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const openAuthModal = (mode: "signin" | "signup" = "signin") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 300));

    const nameFromEmail = email.split("@")[0] || "User";
    const formattedName = nameFromEmail
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    const loggedUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: formattedName,
      email: email,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };

    saveUserSession(loggedUser);
    setIsLoading(false);
    closeAuthModal();
    return true;
  };

  const signup = async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 300));

    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: name || "New User",
      email: email,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };

    saveUserSession(newUser);
    setIsLoading(false);
    closeAuthModal();
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const googleUser: User = {
      id: "usr_google_" + Math.random().toString(36).substring(2, 9),
      name: "Alex Morgan",
      email: "alex.morgan@gmail.com",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      createdAt: new Date().toISOString(),
    };

    saveUserSession(googleUser);
    setIsLoading(false);
    closeAuthModal();
    return true;
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authMode,
        setAuthMode,
        login,
        signup,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
