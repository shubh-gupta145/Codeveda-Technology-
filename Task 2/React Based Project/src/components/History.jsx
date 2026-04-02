import styles from "./History.module.css";

function History({ history, onSelect, onClear }) {
  if (history.length === 0) {
    return (
      <div className={styles.panel}>
        <div className={styles.empty}>No history yet</div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span>History</span>
        <button className={styles.clearBtn} onClick={onClear}>Clear</button>
      </div>
      {[...history].reverse().map((item, i) => (
        <div
          key={i}
          className={styles.item}
          onClick={() => onSelect(item.result)}
        >
          <span className={styles.itemExpr}>{item.expression}</span>
          <span className={styles.itemResult}>= {item.result}</span>
        </div>
      ))}
    </div>
  );
}

export default History;