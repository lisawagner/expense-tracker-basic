import { NavLink } from 'react-router-dom'
// styles
import styles from './Navbar.module.css'
import Logo from '../../assets/icons/logo.svg'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand} >
        <img src={Logo} alt='logo'/>
      </NavLink>
      <ul className={styles.navlinks}>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
      </ul>
  </nav>
  )
}
