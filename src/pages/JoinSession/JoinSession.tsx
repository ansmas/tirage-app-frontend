import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { apiPost } from "../../api/client";

import styles from "./JoinSession.module.css";

export function JoinSession() {
  const [sessionId, setSessionId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleJoin() {
    if (!sessionId.trim() || !name.trim()) return;

    setLoading(true);

    try {
      const response = await apiPost<{ userId: string }>(
        `/sessions/${sessionId}/join`,
        { name }
      );

      localStorage.setItem("userId", response.userId);
      navigate(`/draw/${sessionId}`);
    } catch {
      alert("Impossible de rejoindre la session");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sortitione</h1>
      <h2 className={styles.subtitle}>Rejoindre une session</h2>

      <Input
        label="ID de session"
        value={sessionId}
        onChange={setSessionId}
      />

      <Input
        label="Votre prénom"
        value={name}
        onChange={setName}
      />

      <div className={styles.footer}>
        <Button
          variant="primary"
          disabled={!sessionId || !name || loading}
          onClick={handleJoin}
        >
          Rejoindre
        </Button>

        <button
          className={styles.secondaryAction}
          onClick={() => navigate("/")}
        >
          Créer une session
        </button>
      </div>
    </div>
  );
}
