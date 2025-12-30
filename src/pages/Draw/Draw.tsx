import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { UserList } from "./components/UserList";
import { ExclusionList } from "./components/ExclusionList";
import { FooterActions } from "./components/FooterActions";
import { apiGet } from "../../api/client";

import styles from "./Draw.module.css";
import { Confetti } from "./components/Confetti";

type User = {
  id: string;
  name: string;
  ready: boolean;
  excludedUserIds: string[];
};

export function Draw() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const userId = localStorage.getItem("userId");

  const [users, setUsers] = useState<User[]>([]);
  const [showCountdown, setShowCountdown] = useState(false);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  const countdownStarted = useRef(false);

  const fetchSession = useCallback(async () => {
    if (!sessionId) return;

    const data = await apiGet<{
      users: User[];
      hasResult: boolean;
    }>(`/sessions/${sessionId}`);

    setUsers(data.users);

    if (data.hasResult && !countdownStarted.current) {
      countdownStarted.current = true;
      setShowCountdown(true);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 1500);
    return () => clearInterval(interval);
  }, [fetchSession]);

  useEffect(() => {
    if (!showCountdown || result) return;

    if (count === 0) {
      apiGet<{ name: string }>(
        `/sessions/${sessionId}/result?userId=${userId}`
      ).then(res => setResult(res.name));
      return;
    }

    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showCountdown, count, result, sessionId, userId]);

  // supprimer les confettis après leur chute
  useEffect(() => {
    if (!result) return;

    const t = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(t);
  }, [result]);

  if (!userId) return <p>Utilisateur non identifié</p>;

  if (showCountdown && !result) {
    return <div className={styles.countdown}>{count}</div>;
  }

  if (result) {
    return (
      <div className={styles.resultScreen}>
        {showConfetti && <Confetti />}

        <h1 className={styles.resultName}>{result}</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Session</h1>
        <p className={styles.sessionId}>
          ID : <span>{sessionId}</span>
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Participants</h2>
        <UserList users={users} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Exclusions</h2>
        <ExclusionList
          sessionId={sessionId!}
          userId={userId}
          users={users}
          onChange={fetchSession}
        />
      </section>

      <FooterActions
        sessionId={sessionId!}
        userId={userId}
        ready={!!users.find(u => u.id === userId)?.ready}
        onReady={fetchSession}
      />
    </div>
  );
}
