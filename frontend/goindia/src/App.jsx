import './App.css';
import Layout from './components/Layout';
import GeneralProductsPage from './pages/GeneralProductsPage';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewProduct from './pages/ViewProduct';

import College from './pages/College';
import { useState, useEffect, createContext } from 'react';
import { supabase } from './supabaseClient';

import PostProduct from './pages/PostProduct';
import Demo from './Demo';
export const UserContext = createContext(null);
function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <>
      <UserContext value={{ session, setSession }}>
        <BrowserRouter>
          <div className="w-full h-screen bg-white text-black flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<Layout />}>
                <Route path="/products" element={<GeneralProductsPage />} />
                <Route path="/view-product" element={<ViewProduct />} />
                <Route path="/college" element={<College />} />
                <Route path="/post-product" element={<PostProduct />} />
                {/* <Route path='/demo' element={<Demo />}/> */}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext>
    </>
  );
}

export default App;
