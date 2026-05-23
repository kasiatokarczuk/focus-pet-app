import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Header from '../components/Header';
import PetCard from '../components/PetCard';
import { initialAppState } from '../data/initialState';
import { mockShopItems } from '../data/mockShopItems';

const filters = ['All', 'Food', 'Accessories'];

function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { coins, pet, user } = initialAppState;

  const visibleItems = mockShopItems.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter.toLowerCase();
  });

  return (
    <main className="app-shell">
      <Header coins={coins} userLevel={user.title} userName={user.name} />
      <section className="page-content page-content--two-columns">
        <div>
          <h1>Pet Shop</h1>
          <div className="segmented-control">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? 'is-active' : ''}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="shop-grid">
            {visibleItems.map((item) => (
              <article className="shop-card" key={item.id}>
                <div className="shop-card__image" aria-hidden="true" />
                <div className="shop-card__title">
                  <h3>{item.name}</h3>
                  <strong>{item.price} Coins</strong>
                </div>
                <p>{item.description}</p>
                <Button variant={item.owned ? 'secondary' : 'primary'}>
                  {item.owned ? 'Try On' : 'Buy Now'}
                </Button>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <PetCard compact pet={pet} />
        </aside>
      </section>

      <Link className="floating-action" to="/session">
        <Button>Start Session</Button>
      </Link>
      <BottomNav />
    </main>
  );
}

export default ShopPage;
