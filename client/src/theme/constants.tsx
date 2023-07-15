export default function SetTheme(isDark: boolean) {
  const light = {
    bgPrimary: "white",
    textColor: "black",
    buttonBg: "rgb(16,163,127)"
  };

  const dark = {
    bgPrimary: "rgb(52,53,65)",
    textColor: "white",
    buttonBg: "rgb(16,163,127)"
  };

  return isDark ? dark : light;
}
