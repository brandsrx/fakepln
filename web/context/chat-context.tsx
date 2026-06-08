"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";


interface ChatContextType {
    message: string;
    setMessage: (msg: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {

    const [message, setMessage] = useState<string>("");

    return (
        <ChatContext.Provider value={{ message, setMessage }}>
            {children}
        </ChatContext.Provider>
    );

}

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat should be used within ChatProvider");
    return context;
}
