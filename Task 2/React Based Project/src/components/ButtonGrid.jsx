import styles from "./ButtonGrid.module.css";
import Button from "./Button";

const BUTTONS = [
  { label: "AC",  type: "fn" },
  { label: "+/-", type: "fn" },
  { label: "%",   type: "fn" },
  { label: "÷",   type: "op" },
  { label: "7",   type: "num" },
  { label: "8",   type: "num" },
  { label: "9",   type: "num" },
  { label: "×",   type: "op" },
  { label: "4",   type: "num" },
  { label: "5",   type: "num" },
  { label: "6",   type: "num" },
  { label: "−",   type: "op" },
  { label: "1",   type: "num" },
  { label: "2",   type: "num" },
  { label: "3",   type: "num" },
  { label: "+",   type: "op" },
  { label: "0",   type: "num", wide: true },
  { label: ".",   type: "num" },
  { label: "=",   type: "eq" },
];

function ButtonGrid({ onPress }) {
  return (
    <div className={styles.grid}>
      {BUTTONS.map((btn) => (
        <Button
          key={btn.label}
          label={btn.label}
          type={btn.type}
          wide={btn.wide}
          onClick={onPress}
        />
      ))}
    </div>
  );
}

export default ButtonGrid;