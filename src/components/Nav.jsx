import { NavLink } from 'react-router-dom'

export default function Nav({ cartCount }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <span className="bug-dot" aria-hidden="true"></span>
          GingerBug
        </NavLink>
        <nav>
          <ul className="nav-links">
            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
            <li>
              <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
                Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}