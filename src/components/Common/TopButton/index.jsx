import React, { useEffect } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

function TopButton() {
  useEffect(() => {
    const handleScroll = () => {
      const mybutton = document.getElementById("top-btn");
      if (!mybutton) return;
      
      if (window.scrollY > 500) {
        mybutton.style.display = "flex";
      } else {
        mybutton.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div
      className="top-btn"
      id="top-btn"
      onClick={scrollToTop}
    >
      <ExpandLessRoundedIcon />
    </div>
  );
}

export default TopButton;
