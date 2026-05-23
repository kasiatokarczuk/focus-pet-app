import { Link } from 'react-router-dom';

function Header({ coins = 0, userName = 'MochiMaster', userLevel = 'Level 12 Guardian' }) {
  return (
    <header className="app-header">
      <Link className="brand" to="/home">
        Focus Pet
      </Link>

      <div className="balance" aria-label="User balance">
        <span>Balance:</span>
        <strong>{coins.toLocaleString('en-US')} Coins</strong>
      </div>

      <div className="app-header__profile">
        <Link className="logout-link" to="/logout">
          Log out
        </Link>
        <div>
          <strong>{userName}</strong>
          <span>{userLevel}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
