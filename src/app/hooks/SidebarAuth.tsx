import { useContext } from "react";
import { SidebarContext } from "../context/SidebarAuthProvider";

export const useSidebarAuth = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar doit être utilisé dans un SidebarProvider");
  }
  return context;
};
