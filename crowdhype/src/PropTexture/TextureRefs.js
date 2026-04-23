import { useRef } from "react";

export const useMaterialRefs = (el) => {
  const materialRefs = useRef(null);
  if (el && !materialRefs.current.includes(el)) {
    materialRefs.current.push(el);
  }
  return materialRefs;
};

export const useTextRefs = (el) => {
  const textRefs = useRef(null);
  if (el && !textRefs.current.includes(el)) {
    textRefs.current.push(el);
  }
  return textRefs;
};
