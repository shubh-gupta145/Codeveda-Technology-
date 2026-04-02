import styles from "./Header.module.css";

function Header({ showHistory, onHistoryToggle, theme, onThemeToggle }) {
  return (
    <div className={styles.header}>
      <span className={styles.title}>Calc</span>
      <div className={styles.actions}>
        <button
          className={`${styles.iconBtn} ${showHistory ? styles.iconBtnActive : ""}`}
          onClick={onHistoryToggle}
          aria-label="Toggle history"
        >
          ⏱
        </button>
        <button
          className={styles.iconBtn}
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </div>
  );
}

export default Header;