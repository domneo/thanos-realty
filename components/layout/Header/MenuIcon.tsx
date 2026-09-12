interface MenuIconProps {
  mode: "light" | "dark";
  menuOpen: boolean;
}

export const MenuIcon = ({ mode, menuOpen }: MenuIconProps) => {
  return (
    <svg
      width="37"
      height="36"
      viewBox="0 0 37 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.40245 8.94143H33.5976C34.1532 8.94143 34.6041 8.49048 34.6041 7.93495C34.6041 7.37933 34.1531 6.92847 33.5976 6.92847H3.40245C2.84692 6.92847 2.39597 7.37933 2.39597 7.93495C2.39597 8.49056 2.84692 8.94143 3.40245 8.94143Z"
        fill={mode === "light" ? "#054650" : "#FFFFFF"}
        style={{
          transform: menuOpen ? "rotate(45deg)" : "rotate(0)",
          transformOrigin: "18% 38%",
          transition: "0.3s transform",
        }}
      />
      <path
        d="M33.5976 16.9935H3.40241C2.8468 16.9935 2.39594 17.4445 2.39594 18C2.39594 18.5555 2.84688 19.0065 3.40241 19.0065H33.5976C34.1532 19.0065 34.604 18.5555 34.604 18C34.604 17.4445 34.1532 16.9935 33.5976 16.9935Z"
        fill={mode === "light" ? "#054650" : "#FFFFFF"}
        style={{
          opacity: menuOpen ? "0" : "1",
        }}
      />
      <path
        d="M33.5976 27.0586H3.40241C2.8468 27.0586 2.39594 27.5095 2.39594 28.0651C2.39594 28.6207 2.84688 29.0716 3.40241 29.0716H33.5976C34.1532 29.0716 34.604 28.6206 34.604 28.0651C34.6041 27.5095 34.1532 27.0586 33.5976 27.0586Z"
        fill={mode === "light" ? "#054650" : "#FFFFFF"}
        style={{
          transform: menuOpen ? "rotate(-45deg)" : "rotate(0)",
          transformOrigin: "18% 60%",
          transition: "0.3s transform",
        }}
      />
    </svg>
  );
};
