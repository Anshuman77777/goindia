import React, { useContext } from 'react';
import AshokaChakra from '../assets/Ashoka_Chakra.svg';
import { supabase } from '../../supabaseClient';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

function Navbar() {
  const { session, setSession } = useContext(UserContext);
  console.log(session);
  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <>
      <div className="navbar bg-gradient-to-br text-white from-orange-500 to-red-600 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-india-navy-blue rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><Link to="">Colleges</Link></li>
              <li><Link to="/post-product">Post your own product</Link></li>
              <li><Link to="">Become Investor</Link></li>
            </ul>
          </div>

          <img src={AshokaChakra} className="w-10 h-10 animate-spin" alt="logo" />
          <a className="btn btn-ghost text-xl">GoIndia</a>
        </div>

        <div className="navbar-end">

          {
            session ? (
              <>
              <img src={session.user.user_metadata.avatar_url} className='h-8 w-8 mx-2 rounded-2xl'></img>
              <h1>{session.user.user_metadata.full_name}</h1>
              <button className="btn bg-india-navy-blue mx-1" onClick={signOut}>
                Signout
              </button>
              </>
            ) : (
              <>
              
              <button className="btn bg-india-navy-blue mx-1" onClick={signUp}>
                Login
              </button>
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Navbar;
