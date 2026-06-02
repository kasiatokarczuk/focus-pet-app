export function calculateSessionRewards(durationSeconds) {
  const minutes = durationSeconds / 60;
  const hasFocusTime = durationSeconds > 0;

  return {
    coins: hasFocusTime ? Math.max(Math.round(minutes * 2), 1) : 0,
    xp: hasFocusTime ? Math.max(Math.floor(minutes / 5), 1) : 0,
    hp: hasFocusTime ? Math.max(Math.round(minutes * 0.6), 1) : 0,
  };
}

export function calculateTaskReward(task) {
  const priorityMultiplier = {
    low: 1,
    medium: 1.5,
    high: 2,
  };

  return {
    coins: Math.round(25 * (priorityMultiplier[task.priority] || 1)),
    xp: Math.round(10 * (priorityMultiplier[task.priority] || 1)),
  };
}

export function applyPetDamage(pet, damage) {
  return {
    ...pet,
    hp: Math.max(pet.hp - damage, 0),
    stage: pet.hp - damage <= 0 ? 'hibernation' : pet.stage,
  };
}
