import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: 'home', label: 'Home', to: '/home' },
  { icon: 'tasks', label: 'Tasks', to: '/tasks' },
  { icon: 'shop', label: 'Shop', to: '/shop' },
];

function NavIcon({ name }) {
  const commonProps = {
    'aria-hidden': 'true',
    className: 'bottom-nav__icon',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 2,
    viewBox: '0 0 24 24',
  };

  if (name === 'home') {
    return (
      <svg {...commonProps}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5.5 10.5V20h4.75v-5.5h3.5V20h4.75v-9.5" />
      </svg>
    );
  }

  if (name === 'tasks') {
    return (
      <svg {...commonProps}>
        <path d="M9 4h6" />
        <path d="M9 4a3 3 0 0 0-3 3v1h12V7a3 3 0 0 0-3-3" />
        <path d="M6 8h12v12H6z" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M7 8V7a5 5 0 0 1 10 0v1" />
      <path d="M5 8h14l-1 12H6L5 8z" />
    </svg>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav__inner">
        {navItems.map((item) => (
          <NavLink className="bottom-nav__link" key={item.to} to={item.to}>
            <NavIcon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
