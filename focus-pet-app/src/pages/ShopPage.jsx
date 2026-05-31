import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import Header from '../components/Header';
import PetCard from '../components/PetCard';
import ShopItemCard from '../components/ShopItemCard';
import { loadAppState } from '../utils/storage';

const filters = ['All', 'Food', 'Accessories'];

function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [appState] = useState(() => loadAppState());
  const { coins, pet, shopItems, user } = appState;

  const visibleItems = shopItems.filter((item) => {
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
              <ShopItemCard item={item} key={item.id} />
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
