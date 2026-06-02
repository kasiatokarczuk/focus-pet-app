import Button from './Button';

function ShopItemCard({ item, onBuy }) {
  function handleAction() {
    onBuy(item.id);
  }

  return (
    <article className="shop-card">
      <div className="shop-card__image">
        {item.image ? (
          <img src={`${process.env.PUBLIC_URL}${item.image}`} alt={item.name} />
        ) : null}
      </div>
      <div className="shop-card__title">
        <h3>{item.name}</h3>
        <strong>{item.price} Coins</strong>
      </div>
      <p>{item.description}</p>
      <Button onClick={handleAction} variant={item.owned ? 'secondary' : 'primary'}>
        {item.owned ? 'Purchased' : 'Buy Now'}
      </Button>
    </article>
  );
}

export default ShopItemCard;
