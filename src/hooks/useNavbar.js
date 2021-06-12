import { useEffect, useState } from "react";

function useNavbar(initial) {
  const [open, setOpen] = useState(initial);
  function toggle() {
    setOpen(!open);
  }
  useEffect(() => {
    let navigationBar = document.getElementById("navigation-bar");
    open
      ? (navigationBar.style.display = "flex")
      : (navigationBar.style.display = "none");

    return () => {
      navigationBar.style.display = "flex";
    };
  }, [open]);
  return [toggle];
}

export default useNavbar;
