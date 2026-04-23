import React, { createContext, useRef } from "react";

export const MaterialRefsContext = createContext();
export const TextRefsContext = createContext();
export const GameOverTextContext = createContext();

export const RefsProvider = ({ children }) => {
  const materialRefs = useRef([]);
  const textRefs = useRef([]);
  const gameOverRefs = useRef([]);

  // Const's for adding refs
  const addToMaterialRefs = (el) => {
    if (el && !materialRefs.current.includes(el)) {
      materialRefs.current.push(el);
    }
  };

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToGameOverRefs = (el) => {
    if (el && !gameOverRefs.current.includes(el)) {
      gameOverRefs.current.push(el);
    }
  };

  // A provider for the different refs
  return (
    <MaterialRefsContext.Provider value={{ materialRefs, addToMaterialRefs }}>
      <TextRefsContext.Provider value={{ textRefs, addToTextRefs }}>
        <GameOverTextContext.Provider
          value={{ gameOverRefs, addToGameOverRefs }}
        >
          {children}
        </GameOverTextContext.Provider>
      </TextRefsContext.Provider>
    </MaterialRefsContext.Provider>
  );
};
