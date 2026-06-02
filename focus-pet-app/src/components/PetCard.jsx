import StatBar from './StatBar';

function PetCard({ pet, compact = false, statGains = {} }) {
  if (!pet) {
    return null;
  }

  return (
    <section className={`pet-card ${compact ? 'pet-card--compact' : ''}`.trim()}>
      <div className="pet-card__avatar" aria-hidden="true">
        <span>{pet.name?.charAt(0) || '?'}</span>
      </div>
      <h2>{pet.name}</h2>
      <p>{pet.stageLabel}</p>
      <div className="pet-card__stats">
        <StatBar gain={statGains.xp} label="XP" value={pet.xp} max={pet.nextLevelXp} tone="mint" />
        <StatBar gain={statGains.hp} label="HP" value={pet.hp} max={100} tone="danger" />
        <StatBar gain={statGains.energy} label="Energy" value={pet.energy} max={100} tone="warning" />
      </div>
    </section>
  );
}

export default PetCard;
