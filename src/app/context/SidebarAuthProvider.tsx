"use client";

import React, { createContext, useState, ReactNode } from "react";
import { SidebarAuthentification } from "../components";

interface SidebarContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
      {children}
      {isSidebarOpen && <SidebarAuthentification />} {/* Rendre la sidebar uniquement si elle est ouverte */}
    </SidebarContext.Provider>
  );
}
