import styles from "./UserList.module.css";

type User = {
     id: string;
     name: string;
     ready: boolean;
};

type Props = {
     users: User[];
}

export function UserList({ users }: Props){
     return(
          <ul className={styles.list}>
               {users.map((u) => (
                    <li key={u.id} className={`${styles.item} ${u.ready ? styles.ready : styles.notReady}`}>
                         {u.name}
                    </li>
               ))}
          </ul>
     )
}