import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./Provider/AuthProvider";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout().catch((error) => console.error(error.message));
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Hamburger Menu for Mobile & Tablet */}
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>

        {/* Navbar Brand */}
        <h1 className="text-2xl font-bold hover:text-blue-200 flex-grow text-center lg:text-left lg:flex-grow-0">
          BookHub
        </h1>

        {/* Navbar Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row lg:items-center absolute lg:static bg-blue-600 lg:bg-transparent w-[70%] sm:w-[60%] md:w-[50%] left-0 top-14 z-50 shadow-lg lg:shadow-none transition-all duration-300 md:justify-center`}
        >
          <NavLink
            to="/"
            className="block py-2 px-4 lg:inline-block hover:text-blue-200 border-2 border-transparent hover:border-white rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/all-books"
            className="block py-2 px-4 lg:inline-block hover:text-blue-200 border-2 border-transparent hover:border-white rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            All Books
          </NavLink>
          <NavLink
            to="/upcoming-books"
            className="block py-2 px-4 lg:inline-block hover:text-blue-200 border-2 border-transparent hover:border-white rounded-md"
            onClick={() => setMenuOpen(false)}
          >
            Upcoming Books
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/add-book"
                className="block py-2 px-4 lg:inline-block hover:text-blue-200 border-2 border-transparent hover:border-white rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Add Book
              </NavLink>
              <NavLink
                to="/borrowed-books"
                className="block py-2 px-4 lg:inline-block hover:text-blue-200 border-2 border-transparent hover:border-white rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Borrowed Books
              </NavLink>
            </>
          )}
        </div>

        {/* Add the ThemeToggle button here */}
        <ThemeToggle />

        {/* User Authentication/Profile Section */}
        <div className="absolute right-0 top-3 lg:static flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-outline border-white hover:bg-white hover:text-blue-600 mr-3 md:mr-0 border-2 border-white text-white rounded-md py-2 px-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:flex btn btn-sm btn-outline border-white hover:bg-white hover:text-blue-600 border-2 border-white text-white rounded-md py-2 px-4"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
              />
              <div className="absolute hidden group-hover:block bg-white text-blue-600 rounded shadow-lg p-2 right-0 top-8">
                <p className="font-semibold">{user.displayName}</p>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white mt-2 border-2 border-blue-600 text-blue-600 rounded-md py-2 px-4"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
