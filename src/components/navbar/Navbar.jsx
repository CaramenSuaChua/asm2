import "./navbar.css"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <a onClick={() => navigate('/')}>
          <span className="logo">Booking Website</span>
        </a>
        <div className="navItems">
          {user?.name ? <div>
            <label>Xin Chào, {user.name}</label>
            <button className="navButton " onClick={() => navigate('/transactions')}>Transaction</button >
            <button className="navButton "
              onClick={() => {
                localStorage.removeItem('user')
                navigate('/')
              }} >Log out</button>
          </div> : <div>
            <button className="navButton" onClick={() => navigate('/register')}>Register</button >
            <button className="navButton" onClick={() => navigate('/login')} >Login</button>
          </div>}
        </div>
      </div>
    </div >
  )
}

export default Navbar
