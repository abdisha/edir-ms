// features/auth/context/AuthContext.ts

import {createContext} from "react";

export interface User{

    id:string;

    email:string;

    firstName:string;

    lastName:string;

}

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login(user: User): void;
    logout(): Promise<void>;
    refresh(): Promise<void>;
}

export const AuthContext=
    createContext<AuthContextValue>(null!);