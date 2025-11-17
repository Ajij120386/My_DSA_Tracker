export default function ProgressBar({ percentage }) {
  return (
    <div className="progress-wrapper">
      <div className="progress-label">
        {Math.round(percentage)}% Completed
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
