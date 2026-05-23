import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { petChoices } from '../data/initialState';

function OnboardingPage() {
  const [selectedPet, setSelectedPet] = useState(petChoices[2].id);
  const navigate = useNavigate();

  function handleStart(event) {
    event.preventDefault();
    navigate('/home');
  }

  return (
    <main className="onboarding-page">
      <a className="brand" href="/login">
        Focus Pet
      </a>
      <form className="onboarding-card" onSubmit={handleStart}>
        <h1>Welcome to Focus Pet</h1>
        <p>Your digital productivity companion</p>

        <Input id="petName" label="Pet name" placeholder="Give your pet a name" />

        <div className="pet-choice-grid" role="list">
          {petChoices.map((pet) => (
            <button
              className={`pet-choice ${selectedPet === pet.id ? 'pet-choice--active' : ''}`}
              key={pet.id}
              onClick={() => setSelectedPet(pet.id)}
              type="button"
            >
              <span className="pet-choice__image" aria-hidden="true" />
              <span>{pet.label}</span>
            </button>
          ))}
        </div>

        <Button type="submit">Start</Button>
      </form>
    </main>
  );
}

export default OnboardingPage;
