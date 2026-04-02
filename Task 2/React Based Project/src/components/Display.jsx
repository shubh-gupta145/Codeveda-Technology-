import { useEffect, useRef } from "react";
import styles from "./Display.module.css";

function Display({ expression, current, hasError }) {
  const currentRef = useRef(null);

  useEffect(() => {
    if (currentRef.current) {
      const len = current.length;
      const size =
        len > 12 ? "1.8rem" :
        len > 9  ? "2.4rem" :
        len > 6  ? "3rem"   : "3.8rem";
      currentRef.current.style.fontSize = size;
    }
  }, [current]);

  return (
    <div className={styles.display}>
      <div className={styles.expression}>{expression || "\u00A0"}</div>
      <div
        ref={currentRef}
        className={`${styles.current} ${hasError ? styles.error : ""}`}
      >
        {current || "0"}
      </div>
    </div>
  );
}

export default Display;