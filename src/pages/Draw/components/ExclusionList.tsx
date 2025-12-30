import { apiPost } from "../../../api/client";
import styles from "./ExclusionList.module.css"

type User = {
     id: string;
     name: string;
     excludedUserIds: string[];
};

type Props = {
     sessionId: string;
     userId: string;
     users: User[];
     onChange: () => void;
};

export function ExclusionList({sessionId, userId, users, onChange,}: Props) {
     const me = users.find((u) => u.id === userId);
     if(!me) return null;

     async function toggleExclude(excludedUserId: string) {
          try {
               await apiPost(`/sessions/${sessionId}/exclusions`, {
                    userId,
                    excludedUserId,
               });

               onChange();
          } catch {
               alert("Erreur lors de la mise à jour des exclusions");
          }
     }

     return(
          <ul className={styles.list}>
               {users
                    .filter((u) => u.id !== userId)
                    .map((user) => {
                         const excluded = me.excludedUserIds.includes(user.id);

                         return(
                              <li
                                   key={user.id}
                                   className={`${styles.item} ${excluded ? styles.excluded : ""}`}
                                   onClick={() => toggleExclude(user.id)}
                              >
                                   {user.name}
                              </li>
                         )
                    })
               }
          </ul>
     )
}