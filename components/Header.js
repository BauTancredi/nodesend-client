import React, { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";

const Header = () => {
  // Access state
  const AuthContext = useContext(authContext);
  const { authenticatedUser, user, logout } = AuthContext;

  useEffect(() => {
    authenticatedUser();
  }, []);

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center">
            <p className="mr-2">Hi: {user.name}</p>
            <button
              type="button"
              className="bg-black px-10 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-10 py-3 rounded-lg text-white font-bold uppercase mr-2">
                Log in
              </a>
            </Link>
            <Link href="/createaccount">
              <a className="bg-black px-10 py-3 rounded-lg text-white font-bold uppercase">
                Create account
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
