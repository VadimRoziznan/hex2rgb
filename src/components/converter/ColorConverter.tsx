import React, { useState, useEffect } from "react";
import "./converter.css";

interface ColorConverterProps {
  // eslint-disable-next-line no-unused-vars
  onColorChange: (color: string) => void;
};

export const ColorConverter = ({ onColorChange }: ColorConverterProps) => {

  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const regex: RegExp = /^#.{6}$/;
  const rgbErrorColor: string = `RGB(${255}, ${0}, ${0})`;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    if (regex.test(inputValue)) {
      setValue(inputValue);
    } else {
      setValue("");
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
    setResult("Ошибка!");
    onColorChange(rgbErrorColor);
  };

  useEffect(() => {
    if (value.length === 7) {
      const rgbValue: string = hexToRgb(value);
      setResult(rgbValue);
      onColorChange(rgbValue);
    } else {
      errorColor();
    };
  }, [value]);

  const handleBackground = () => {
    if (regex.test(value)) {
      return result;
    };
    return rgbErrorColor;
  };

  return (
    <div className="container">
      <input type="text" onInput={handleInput} />
      <input style={{ background: handleBackground() }} type="text" value={result} readOnly />
    </div>
  );
};
