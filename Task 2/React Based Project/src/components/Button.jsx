import styles from "./Button.module.css";

function Button({ label, type, onClick, wide }) {
  const typeClass = {
    num: styles.num,
    fn:  styles.fn,
    op:  styles.op,
    eq:  styles.eq,
  }[type] || styles.num;

  return (
    <button
      className={`${styles.btn} ${typeClass} ${wide ? styles.wide : ""}`}
      onClick={() => onClick(label)}
      aria-label={label}
    >
      <span>{label}</span>
      <span className={styles.ripple} />
    </button>
  );
}

export default Button;