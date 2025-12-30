import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { apiPost } from "../../api/client";

import styles from "./CreateSession.module.css";

export function CreateSession() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCreate() {
    if(!name.trim()) return;

    setLoading(true);

    try {
      const response = await apiPost<{
        sessionId: string;
        userId: string;
      }>("/sessions", { name });

      localStorage.setItem("userId", response.userId);
      navigate(`/draw/${response.sessionId}`);
    } catch {
      alert("Erreur lors de la création de la session");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sortitione</h1>
      <h2 className={styles.subtitle}>Créer une session</h2>

      <Input label="Prénom" value={name} onChange={setName} placeholder="ex: Alice" />

      <div className={styles.footer}>
        <Button
          variant="primary"
          disabled={!name.trim() || loading}
          onClick={handleCreate}
        >
          Créer la session
        </Button>

        <button
          className={styles.secondaryAction}
          onClick={() => navigate("/join")}
        >
          Rejoindre une session
        </button>
      </div>
    </div>
  );
}
