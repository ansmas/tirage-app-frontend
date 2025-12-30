import styles from "./Button.module.css";

type ButtonProps = {
     children: React.ReactNode;
     onClick?: () => void;
     type?: "button" | "submit";
     variant?: "default" | "primary";
     disabled?: boolean;
};

export function Button({
     children,
     onClick,
     type = "button",
     variant = "default",
     disabled = false,
}: ButtonProps) {
     return(
          <button 
               type={type}
               onClick={onClick}
               disabled={disabled}
               className={[
                    styles.button,
                    variant === "primary" ? styles.primary : "",
                    disabled ? styles.disabled : "",
                    !disabled && variant === "primary" ? styles.active : "",
               ].join(" ")}
          >
               {children}
          </button>
     )
}