import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";

export function useFollowPointer() {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      setPoint({ x: clientX, y: clientY + scrollY.get() });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [scrollY]);

  return point;
}
