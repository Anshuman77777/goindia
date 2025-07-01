

import './App.css'
import Layout from './components/Layout';
import GeneralProductsPage from './pages/GeneralProductsPage';
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewProduct from './pages/ViewProduct';
import College from './pages/College';
function App() {
  

  return (
    
    <BrowserRouter>
    <div className='w-full h-screen bg-white text-black flex flex-col'>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route element={<Layout/>}>
      <Route path='/products' element={<GeneralProductsPage/>}/>
      <Route path ='/view-product' element={<ViewProduct/>}/>
      <Route path='/college' element={<College/>}/>
      </Route>
    </Routes>
    </div>
    </BrowserRouter>
      
    
  )
}

export default App
