import React, { useContext } from 'react'
import  AshokaChakra  from '../assets/Ashoka_Chakra.svg';
import { supabase } from '../../supabaseClient';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
function Navbar() {
  const {session,setSession}=useContext(UserContext);
  console.log(session);
  const signOut=async()=>{
  
    supabase.auth.signOut();
    setSession(null);

  }
  const signUp = async()=>{
      await supabase.auth.signInWithOAuth({
        provider:"google",
      });
     
    }
  return (
    <div className="navbar bg-gradient-to-br text-white  from-orange-500 to-red-600 shadow-sm">
  <div className="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-india-navy-blue rounded-box z-1 mt-3 w-52 p-2 shadow">
   <li>     <Link to="" className="">Colleges</Link></li>
   <li> <Link to="/post-product" className=" ">Post your own product</Link></li>
   <li> <Link to="" className="">Become Investor</Link></li>
      </ul>
    </div>
   <img src={AshokaChakra} className='w-10 h-10 animate-spin'/>

    <Link to='/products' className="btn btn-ghost text-xl">GoIndia</Link>
  </div>
  
  <div className="navbar-end">
    {session?.user?.identities?.[0]?.identity_data && (
  <div className="flex items-center space-x-2 text-white">
    <img
      src={session?.user?.user_metadata?.avatar_url}
      alt="User Avatar"
      className="w-10 h-10 rounded-full"
    />
    <h1 className="font-bold text-sm">
      {session.user.identities[0].identity_data.full_name}
    </h1>
  </div>
)}

    
    
    {
    session? 
  <a className="btn bg-india-navy-blue mx-1"
    onClick={signOut}
    >Signout</a>  :
    <a className="btn bg-india-navy-blue mx-1"
    onClick={signUp}
    >Login</a> 
  }
  </div>
</div>
  )
}

export default Navbar