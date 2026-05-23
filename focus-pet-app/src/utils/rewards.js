export function calculateSessionRewards(durationSeconds) {
  const minutes = Math.floor(durationSeconds / 60);

  return {
    coins: Math.floor(minutes * 0.5 * 2),
    xp: Math.max(Math.floor(minutes / 5), 1),
    hp: 15,
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
