import { apiPost } from "../../../api/client";
import styles from "./FooterActions.module.css";

type Props = {
  sessionId: string;
  userId: string;
  ready: boolean;
  onReady: () => void;
};

export function FooterActions({
  sessionId,
  userId,
  ready,
  onReady,
}: Props) {
  async function handleReady() {
  if (ready) return;

  await apiPost(
    `/sessions/${sessionId}/ready`,
    undefined, // 👈 PAS DE BODY
    {
      headers: {
        "x-user-id": userId,
      },
    }
  );

    onReady();
  }

  return (
    <footer className={styles.footer}>
      <button
        className={styles.readyButton}
        disabled={ready}
        onClick={handleReady}
      >
        {ready ? "En attente…" : "Je suis prêt"}
      </button>
    </footer>
  );
}
