import { useMemo, useState } from "react";
import { LANGS } from "../i18n";
import LangContext from "./LangContext";

export function AppProvider({ children }) {
  const [lang, setLang] = useState(
    localStorage.getItem("apex.lang") || LANGS[0]
  );

  const value = useMemo(
    () => ({
      lang,
      setLang: (l) => {
        localStorage.setItem("apex.lang", l);
        setLang(l);
      },
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// Hook moved to a dedicated file to keep component-only exports here
