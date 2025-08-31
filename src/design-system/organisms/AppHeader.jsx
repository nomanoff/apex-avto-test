import useFullscreen from "../../hooks/useFullscreen";
import useLang from "../../hooks/useLang";
import { LANGS } from "../../app/i18n";

export default function AppHeader() {
  const { isFs, enter, exit } = useFullscreen();
  const { lang, setLang } = useLang();
  return (
    <header
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        alignItems: "center",
        borderBottom: "1px solid #eee",
      }}
    >
      <strong style={{ marginRight: "auto" }}>Apex Avto Test</strong>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {LANGS.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <button onClick={isFs ? exit : enter}>
        {isFs ? "Exit" : "Fullscreen"}
      </button>
    </header>
  );
}
