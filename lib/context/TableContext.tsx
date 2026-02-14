"use client"
import { createContext,ReactNode,useContext } from "react";

const TableContext = createContext<string | null >(null)
export function TableProvider({ tableToken, children }:{tableToken :string, children :ReactNode}) {
  return (
    <TableContext.Provider value={tableToken}>
      {children}
    </TableContext.Provider>
  );
}
export function useTable() {
  return useContext(TableContext);
}