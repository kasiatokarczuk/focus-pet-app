export function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function createTimerSession(durationSeconds) {
  const startedAt = Date.now();

  return {
    durationSeconds,
    startedAt,
    endsAt: startedAt + durationSeconds * 1000,
    status: 'running',
  };
}

export function getRemainingSeconds(session) {
  if (!session) {
    return 0;
  }

  const remainingMs = session.endsAt - Date.now();
  return Math.max(Math.ceil(remainingMs / 1000), 0);
}
