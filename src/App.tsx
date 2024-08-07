import "./App.css";
import { useState } from "react";
import { ColorConverter } from "./components/converter/ColorConverter";

function App() {
  const [color, setColor] = useState("");

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  return (
    <div className="App" style={{ background: color }}>
      <ColorConverter onColorChange={handleColorChange}/>
    </div>
  );
}

export default App;
