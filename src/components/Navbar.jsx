import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const Navbar = () => {

  const linkClass = ({isActive}) => isActive ? 'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

  return (
    <nav style={{backgroundColor: "cornflowerblue"}}>


      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="Recipe Page"/>
              <span className="hidden md:block text-white text-2xl font-bold ml-2">Recipe Locker</span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/my-recipes"
                  className={linkClass}>My Recipes</NavLink>
                <NavLink
                  to="/explore"
                  className={linkClass}>Explore</NavLink>
                <NavLink
                  to="/plan"
                  className={linkClass}>Meal Plan</NavLink>
                <NavLink
                  to="/login"
                  className={linkClass}>Login</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar