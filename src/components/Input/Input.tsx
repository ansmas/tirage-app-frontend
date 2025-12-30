import styles from "./Input.module.css"

type InputProps = {
     label: string;
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
     type?: string;
};

export function Input({
     label,
     value,
     onChange,
     placeholder = "",
     type = "text",
}: InputProps) {
     return(
          <div className={styles.container}>
               <label className={styles.label}>{label}</label>
               <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={styles.input} />
          </div>
     );
}