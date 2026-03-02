import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole, mockUsers } from '../lib/auth';

interface AuthContextType {
    user: AuthUser | null;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const saved = localStorage.getItem('app-auth-user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('app-auth-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('app-auth-user');
        }
    }, [user]);

    const login = (role: UserRole) => {
        setUser(mockUsers[role]);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
