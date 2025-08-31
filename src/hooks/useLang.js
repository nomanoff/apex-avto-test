import { useContext } from "react";
import LangContext from "../app/providers/LangContext";

export default function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within AppProvider");
  return ctx;
}
