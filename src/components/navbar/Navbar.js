import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

// styles
import styles from './Navbar.module.css'
import Logo from '../../assets/icons/logo.svg'

export default function Navbar() {
  // use the logout function from useLogout
  const { logout } = useLogout()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand} >
        <img src={Logo} alt='logo'/>
      </NavLink>
      <ul className={styles.navlinks}>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
        <li><button className="btn" onClick={logout}>Logout</button></li>
      </ul>
  </nav>
  )
}
