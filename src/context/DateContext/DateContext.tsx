import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextType {
  selectedYear: number;
  selectedMonth: number;
  selectedWeek: number;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedWeek: (week: number) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  return (
    <DateContext.Provider value={{ selectedYear, selectedMonth, selectedWeek, setSelectedYear, setSelectedMonth, setSelectedWeek }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
};
