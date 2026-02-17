"use client";

<<<<<<< HEAD
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
=======
import React, { createContext, useContext, useState, ReactNode } from "react";
>>>>>>> d165aa8531781bd49984b5655bdcb37391b68f67

type TableContextType = {
  tableId: string | null;
  setTableId: (id: string | null) => void;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

type TableProviderProps = {
  children: ReactNode;
};

export const TableProvider = ({ children }: TableProviderProps) => {
  const [tableId, setTableId] = useState<string | null>(null);
<<<<<<< HEAD
  useEffect(() => {
    if (tableId) {
      localStorage.setItem("tableId", tableId);
    }
  }, [tableId]);
=======
>>>>>>> d165aa8531781bd49984b5655bdcb37391b68f67

  return (
    <TableContext.Provider value={{ tableId, setTableId }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context)     throw new Error("useTable must be used within a TableProvider");
  return context;
};