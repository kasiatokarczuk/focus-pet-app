import Button from './Button';

function ShopItemCard({ item, onBuy }) {
  function handleAction() {
    if (!item.owned) {
      onBuy(item.id);
    }
  }

  return (
    <article className="shop-card">
      <div className="shop-card__image" aria-hidden="true" />
      <div className="shop-card__title">
        <h3>{item.name}</h3>
        <strong>{item.price} Coins</strong>
      </div>
      <p>{item.description}</p>
      <Button onClick={handleAction} variant={item.owned ? 'secondary' : 'primary'}>
        {item.owned ? 'Try On' : 'Buy Now'}
      </Button>
    </article>
  );
}

export default ShopItemCard;
