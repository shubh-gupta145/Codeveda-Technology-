import { useState, useEffect, useCallback } from "react";

function useCalculator() {
  const [current, setCurrent] = useState("0");
  const [expression, setExpression] = useState("");
  const [operator, setOperator] = useState(null);
  const [operand, setOperand] = useState(null);
  const [justEvaled, setJustEvaled] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Naya state: Ye track karega ki operator dabane ke baad naya number shuru ho raha hai ya nahi
  const [isWaitingForNext, setIsWaitingForNext] = useState(false);

  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("calc_history")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("calc_history", JSON.stringify(history));
  }, [history]);

  const calculate = (a, op, b) => {
    const x = Number(a);
    const y = Number(b);

    switch (op) {
      case "+": return x + y;
      case "−": return x - y;
      case "×": return x * y;
      case "÷": return y === 0 ? "Error" : x / y;
      default: return y;
    }
  };

  const format = (num) => {
    if (num === "Error" || !isFinite(num)) return "Error";
    // To solve floating point issues like 0.1 + 0.2
    return Number(Number(num).toFixed(10)).toString();
  };

  const press = useCallback(
    (label) => {
      if (hasError && label !== "AC") return;
      setHasError(false);

      // --- NUMBER INPUT LOGIC ---
      if (!isNaN(label) || label === ".") {
        if (label === "." && current.includes(".") && !isWaitingForNext) return;

        if (isWaitingForNext || justEvaled) {
          // Agar operator dabaya hai toh screen clear karke naya number shuru karein
          setCurrent(label === "." ? "0." : label);
          setIsWaitingForNext(false);
          setJustEvaled(false);
        } else {
          setCurrent((prev) =>
            prev === "0" && label !== "." ? label : prev + label
          );
        }
        return;
      }

      // --- CLEAR LOGIC ---
      if (label === "AC") {
        setCurrent("0");
        setExpression("");
        setOperator(null);
        setOperand(null);
        setJustEvaled(false);
        setHasError(false);
        setIsWaitingForNext(false);
        return;
      }

      // --- BACKSPACE ---
      if (label === "⌫") {
        if (isWaitingForNext || justEvaled) return;
        setCurrent((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        return;
      }

      // --- SIGN (+/-) ---
      if (label === "+/-") {
        setCurrent((prev) => (Number(prev) * -1).toString());
        return;
      }

      // --- PERCENT (%) ---
      if (label === "%") {
        const val = (Number(current) / 100).toString();
        setCurrent(val);
        return;
      }

      // --- OPERATORS (+, −, ×, ÷) ---
      if (["+", "−", "×", "÷"].includes(label)) {
        if (operator && !isWaitingForNext) {
          // Pehle wali calculation compute karein (chaining: 10 + 5 - 2)
          const result = format(calculate(operand, operator, current));
          if (result === "Error") {
            setCurrent("Error");
            setHasError(true);
            return;
          }
          setOperand(result);
          setCurrent(result);
        } else {
          setOperand(current);
        }

        setOperator(label);
        setIsWaitingForNext(true); // Ab system agle number ka wait karega
        setExpression(`${current} ${label}`);
        setJustEvaled(false);
        return;
      }

      // --- EQUALS (=) ---
      if (label === "=") {
        if (!operator || isWaitingForNext) return;

        const result = format(calculate(operand, operator, current));
        const fullExpr = `${operand} ${operator} ${current} =`;

        if (result === "Error") {
          setCurrent("Error");
          setHasError(true);
          setExpression(fullExpr);
        } else {
          setCurrent(result);
          setExpression(fullExpr);
          setHistory((prev) => [...prev.slice(-49), { expression: fullExpr, result }]);
        }

        setOperator(null);
        setOperand(null);
        setJustEvaled(true);
        setIsWaitingForNext(false);
      }
    },
    [current, operator, operand, justEvaled, hasError, isWaitingForNext, history]
  );

  // --- KEYBOARD SUPPORT ---
  useEffect(() => {
    const MAP = {
      "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
      "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
      ".": ".", "+": "+", "-": "−", "*": "×", "/": "÷",
      Enter: "=", "=": "=", Backspace: "⌫", Escape: "AC", "%": "%",
    };

    const handleKey = (e) => {
      const key = MAP[e.key];
      if (key) {
        e.preventDefault();
        press(key);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [press]);

  const clearHistory = () => setHistory([]);
  const selectHistory = (val) => {
    setCurrent(val);
    setJustEvaled(true);
    setIsWaitingForNext(false);
  };

  return {
    current,
    expression,
    hasError,
    history,
    press,
    clearHistory,
    selectHistory,
  };
}

export default useCalculator;