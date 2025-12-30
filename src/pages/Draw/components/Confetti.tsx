import { useRef } from "react";
import styles from "./Confetti.module.css";

type ConfettiItem = {
  left: string;
  size: number;
  color: string;
  duration: string;
  delay: string;
};

const colors = [
  "var(--color-primary)",
  "var(--color-light)",
  "var(--color-light-grey)",
  "var(--color-light-grey-hover)",
  "var(--color-white)",
];

export function Confetti() {
  const confettis = useRef<ConfettiItem[]>(
    Array.from({ length: 80 }).map(() => {
      const size = 6 + Math.random() * 6;

      return {
        left: `${Math.random() * 100}%`,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: `${2 + Math.random() * 2}s`,
        delay: `${Math.random() * 2}s`,
      };
    })
  );

  return (
    <div className={styles.container}>
      {confettis.current.map((c, i) => (
        <span
          key={i}
          className={styles.confetti}
          style={{
            left: c.left,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            animationDuration: c.duration,
            animationDelay: c.delay,
          }}
        />
      ))}
    </div>
  );
}
