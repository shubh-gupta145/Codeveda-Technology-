import { useState } from "react";
import styles from "./App.module.css";
import "./variable.css";
import Header from "./components/Header";
import Display from "./components/Display";
import ButtonGrid from "./components/ButtonGrid";
import History from "./components/History";
import useCalculator from "./components/useCalculator";

function App() {
  const [theme, setTheme] = useState("dark");
  const [showHistory, setShowHistory] = useState(false);

  const {
    current,
    expression,
    hasError,
    history,
    press,
    clearHistory,
    selectHistory,
  } = useCalculator();

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={`${styles.app} ${theme === "dark" ? styles.dark : styles.light} ${theme}`}>
      <div className={styles.calcWrapper}>

        <Header
          showHistory={showHistory}
          onHistoryToggle={() => setShowHistory((s) => !s)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        {showHistory && (
          <History
            history={history}
            onSelect={(val) => { selectHistory(val); setShowHistory(false); }}
            onClear={clearHistory}
          />
        )}

        <Display
          expression={expression}
          current={current}
          hasError={hasError}
        />

        <ButtonGrid onPress={press} />

      </div>
    </div>
  );
}

export default App;