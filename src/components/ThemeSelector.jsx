import React from "react";

function ThemeSelector({ theme, backgroundColor, borderColor }) {
  const setTheme = () => {
    // update in db
    document.body.setAttribute("data-theme", theme);
  };
  return (
    <div
      className="theme-option"
      id={`theme-${theme}`}
      onClick={setTheme}
      style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
    ></div>
  );
}

export default ThemeSelector;
