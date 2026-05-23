import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Shop', to: '/shop' },
];

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav__inner">
        {navItems.map((item) => (
          <NavLink className="bottom-nav__link" key={item.to} to={item.to}>
            <span className="bottom-nav__icon" aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
