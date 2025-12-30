import { useEffect, useState } from "react";

type Props = {
     onDone: () => void;
}

export function CountdownScreen({ onDone }: Props){
     const [count, setCount] = useState(3);

     useEffect(() => {
          if(count === 0){
               onDone();
               return;
          }

          const timer = setTimeout(() => {
               setCount((c) => c - 1);
          }, 1000);

          return () => clearTimeout(timer);
     }, [count, onDone]);

     return(
          <div>
               <span key={count}>{count}</span>
          </div>
     );
}