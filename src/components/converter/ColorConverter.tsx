import React, { useState, useEffect } from "react";
import "./converter.css";

interface ColorConverterProps {
  // eslint-disable-next-line no-unused-vars
  onColorChange: (color: string) => void;
};

export const ColorConverter = ({ onColorChange }: ColorConverterProps) => {

  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData: string | null = (e.nativeEvent as InputEvent).data ?? "";
    setValue(value + inputData);
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setValue(value.slice(0, -1));
    }
  };

  const hexToRgb = (hex: string) => {
    const hexValue = hex.slice(1); // Удалить '#' из строки
    const r = parseInt(hexValue.slice(0, 2), 16);
    const g = parseInt(hexValue.slice(2, 4), 16);
    const b = parseInt(hexValue.slice(4, 6), 16);
    return `RGB(${r}, ${g}, ${b})`;
  };

  const errorColor = () => {
    const rgbValue: string = `RGB(${255}, ${0}, ${0})`;
    setResult("Ошибка!");
    onColorChange(rgbValue);
  };

  useEffect(() => {
    if (value.length === 7) {
      const rgbValue: string = hexToRgb(value);
      if (rgbValue.includes("NaN")) {
        errorColor();
      } else {
        setResult(rgbValue);
        onColorChange(rgbValue);
      };

    } else {
      errorColor();
    };
  }, [value]);

  const handleBackground = () => {
    return result;
  };

  return (
    <div className="container">
      <input type="text" onInput={handleInput} onKeyDown={handleBackspace}/>
      <input style={{ background: handleBackground() }} type="text" value={result} readOnly />
    </div>
  );
};
