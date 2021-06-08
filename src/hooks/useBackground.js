import { useEffect } from "react";

function useBackground() {
  const apply = (background) => {
    document.body.style.background = background;
  };
  useEffect(() => {
    return () => apply("rgba(246, 246, 247, 1)");
    // eslint-disable-next-line
  }, []);

  return [apply];
}

export default useBackground;
