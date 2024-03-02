import { useLayoutEffect, useState } from "react";

export function useWindowScroll() {
  const [state, setState] = useState({
    scrollX: 0,
    scrollY: 0,
  });

  useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ scrollX: window.scrollX, scrollY: window.scrollY });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { ...state };
}
