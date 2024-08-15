// PromptHistoryContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const PromptHistoryContext = createContext();

export const usePromptHistory = () => {
  return useContext(PromptHistoryContext);
};

export const PromptHistoryProvider = ({ children }) => {
  const [promptHistory, setPromptHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("promptHistory");
    if (storedHistory) {
      setPromptHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addPrompt = (prompt) => {
    setPromptHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, prompt];
      localStorage.setItem("promptHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };
  const deletePrompt = (prompt) => {
    setPromptHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((p) => p !== prompt);
      localStorage.setItem("promptHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }

  return (
    <PromptHistoryContext.Provider value={{ promptHistory, addPrompt }}>
      {children}
    </PromptHistoryContext.Provider>
  );
};
