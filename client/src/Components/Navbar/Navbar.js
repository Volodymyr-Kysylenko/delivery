import { NavLink } from 'react-router-dom';

import './Navbar.scss';

import logo from '../../images/logo/logo.svg';

function Navbar() {
    return(
        <nav className='navbar'>
            <div className='logo'>
                <NavLink to='/'>
                    <img className='logo-img' src={logo}/>
                </NavLink>
            </div>
            <div className='menu'>
                <NavLink className={({ isActive }) => isActive ? 'menu-item menu-item-active' : 'menu-item'} to='/'>
                    Shop
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? 'menu-item menu-item-active' : 'menu-item'} to='/cart'>
                    Shopping Cart
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? 'menu-item menu-item-active' : 'menu-item'} to='/history'>
                    History
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar