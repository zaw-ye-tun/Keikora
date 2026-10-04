export function WorkflowRail({ active }: { active: number }) {
  const path =
    "M15 31C-5 49 35 84 15 102S-5 155 15 173S35 226 15 244S-5 297 15 315";
  return (
    <svg
      className="workflow-rail"
      viewBox="0 0 30 346"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} fill="none" stroke="#bad4de" strokeWidth="1.5" />
      <path
        d={path}
        fill="none"
        stroke="#138b9d"
        strokeWidth="2"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={100 - active * 25}
        className="workflow-rail-progress"
      />
    </svg>
  );
}
