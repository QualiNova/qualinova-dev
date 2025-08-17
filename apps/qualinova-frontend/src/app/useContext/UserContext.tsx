'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
    email: string;
    accountId: string;
    publicKey: string;
};

type UserContexType = {
    user: User | null;
    setUser: (user: User) => void;
};

const UserContext = createContext<UserContexType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within its provider');
    }

    return context;
};
