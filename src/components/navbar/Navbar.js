import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Navbar.module.css'
import Logo from '../../assets/icons/logo.svg'

export default function Navbar() {
  // use the logout function from useLogout
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand} >
        <img src={Logo} alt='logo'/>
      </NavLink>
      <ul className={styles.navlinks}>
        {!user && (
          <>
            <li><NavLink to="/">About</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>
        )}
        {user && (
          <>
            {/* turn into a dropdown profile w/initials or img */}
            <li><NavLink to="/">About</NavLink></li>
            <li><NavLink to="/budget">Budget</NavLink></li>
            <li>Welcome, {user.displayName}</li>
            
            <li><button className="btn" onClick={logout}>Logout</button></li>
          </>
        )}
        
      </ul>
  </nav>
  )
}
