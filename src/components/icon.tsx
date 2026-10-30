export function Icon({
  direction = "diagonal",
}: {
  direction?: "diagonal" | "left" | "right" | "down" | "close";
}) {
  const paths = {
    diagonal: "M5 19 19 5M5 5h14v14",
    left: "M20 12H4m7-7-7 7 7 7",
    right: "M4 12h16m-7-7 7 7-7 7",
    down: "M12 4v16m-7-7 7 7 7-7",
    close: "m6 6 12 12M6 18 18 6",
  };
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
