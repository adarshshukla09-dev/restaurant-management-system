"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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