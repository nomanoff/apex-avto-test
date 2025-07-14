import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [lang, setLang] = useState("uzlotin");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz", { state: { lang } });
  };

  return (
    <div
      className="app-container"
      style={{ textAlign: "center", paddingTop: "100px" }}
    >
      <h1>Select Language</h1>
      <br />
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="uzlotin">O'zbek (Lotin)</option>
        <option value="uzkiril">O'zbek (Kiril)</option>
        <option value="rus">Русский</option>
      </select>
      <br />
      <br />
      <button onClick={handleStart}>Start Test 20</button>

      <br />
      <br />
      <button onClick={() => navigate("/tickets")}>Solve Tickets 700</button>
      <br />
    </div>
  );
};

export default Home;
