function StatBar({ label, value = 0, max = 100, tone = 'mint' }) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="stat-bar">
      <span>{label}</span>
      <div className="stat-bar__track" aria-label={`${label}: ${value} z ${max}`}>
        <div className={`stat-bar__value stat-bar__value--${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default StatBar;
