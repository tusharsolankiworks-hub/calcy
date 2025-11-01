import React, { useState, useCallback } from 'react';
import Button from './components/Button';
import Display from './components/Display';

const App: React.FC = () => {
  const [currentOperand, setCurrentOperand] = useState<string>("");
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  const evaluate = useCallback((): string => {
    const prev = parseFloat(previousOperand!);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";
    let computation: number = 0;
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        if (current === 0) return "Error";
        computation = prev / current;
        break;
    }
    return computation.toString();
  }, [currentOperand, previousOperand, operation]);

  const handleButtonClick = useCallback((label: string) => {
    if (label >= "0" && label <= "9") {
        if (overwrite) {
            setCurrentOperand(label);
            setOverwrite(false);
            return;
        }
        if (label === "0" && currentOperand === "0") return;
        setCurrentOperand(prev => `${prev}${label}`);
    } else if (label === ".") {
        if (currentOperand.includes(".")) return;
        if (overwrite) {
            setCurrentOperand("0.");
            setOverwrite(false);
            return;
        }
        setCurrentOperand(prev => prev === "" ? "0." : `${prev}.`);
    } else {
        switch (label) {
            case "AC":
                setCurrentOperand("");
                setPreviousOperand(null);
                setOperation(null);
                break;
            case "DEL":
                if (overwrite) {
                    setCurrentOperand("");
                    setOverwrite(false);
                    return;
                }
                if (currentOperand === "") return;
                setCurrentOperand(prev => prev.slice(0, -1));
                break;
            case "+/-":
                if (currentOperand === "") return;
                setCurrentOperand(prev => (parseFloat(prev) * -1).toString());
                break;
            case "%":
                if (currentOperand === "") return;
                setCurrentOperand(prev => (parseFloat(prev) / 100).toString());
                break;
            case "=":
                if (operation == null || previousOperand == null || currentOperand === "") return;
                const result = evaluate();
                if (result === "Error") {
                   setCurrentOperand("Error");
                } else {
                   setCurrentOperand(result);
                }
                setOperation(null);
                setPreviousOperand(null);
                setOverwrite(true);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (currentOperand === "" && previousOperand == null) return;
                if (currentOperand === "") {
                    setOperation(label);
                    return;
                }
                if (previousOperand == null) {
                    setPreviousOperand(currentOperand);
                    setCurrentOperand("");
                    setOperation(label);
                } else {
                    const result = evaluate();
                    setPreviousOperand(result);
                    setCurrentOperand("");
                    setOperation(label);
                }
                break;
        }
    }
  }, [currentOperand, previousOperand, operation, overwrite, evaluate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-black p-4 rounded-3xl shadow-lg">
        <Display currentValue={currentOperand} previousValue={previousOperand || ''} operation={operation} />
        <div className="grid grid-cols-4 gap-3">
          <Button onClick={handleButtonClick} label="AC" variant="special" />
          <Button onClick={handleButtonClick} label="+/-" variant="special" />
          <Button onClick={handleButtonClick} label="%" variant="special" />
          <Button onClick={handleButtonClick} label="/" variant="operator" />
          
          <Button onClick={handleButtonClick} label="7" />
          <Button onClick={handleButtonClick} label="8" />
          <Button onClick={handleButtonClick} label="9" />
          <Button onClick={handleButtonClick} label="*" variant="operator" />

          <Button onClick={handleButtonClick} label="4" />
          <Button onClick={handleButtonClick} label="5" />
          <Button onClick={handleButtonClick} label="6" />
          <Button onClick={handleButtonClick} label="-" variant="operator" />

          <Button onClick={handleButtonClick} label="1" />
          <Button onClick={handleButtonClick} label="2" />
          <Button onClick={handleButtonClick} label="3" />
          <Button onClick={handleButtonClick} label="+" variant="operator" />
          
          <Button onClick={handleButtonClick} label="0" className="col-span-2 w-auto" />
          <Button onClick={handleButtonClick} label="." />
          <Button onClick={handleButtonClick} label="=" variant="operator" />
        </div>
      </div>
    </div>
  );
};

export default App;
