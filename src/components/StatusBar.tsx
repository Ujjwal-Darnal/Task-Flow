import { useId, type CSSProperties } from "react";
import "../css/StatusBar.css"
interface StatusBarProps {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

 function StatusBar({
  label,
  count,
  percentage,
  color,
}: StatusBarProps) {
  const meterId = useId();

  return (
    <div className="status-bar">
      <div className="status-bar-header">
        <label htmlFor={meterId}>{label}</label>
        <span>
          {count} {count === 1 ? "task" : "tasks"} · {percentage}%
        </span>
      </div>

      <meter
        id={meterId}
        className="status-bar-meter"
        min={0}
        max={100}
        value={percentage}
        style={{ "--status-color": color } as CSSProperties}
      />
    </div>
  );
}

export default StatusBar;