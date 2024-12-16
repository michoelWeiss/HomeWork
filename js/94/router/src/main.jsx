import { BrowserRouter, Routes, Route } from 'react-router';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './home.jsx';
import  AboutUs  from './aboutUs.jsx';
import  Buy  from './buy.jsx';
import  Sell  from './sell.jsx';
import  ContactUs  from './contactUs.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
<Routes>
  <Route path="/" element={<App />}>
  <Route index= {true} element={<Home />}/>
  <Route path="/aboutUs" element={<AboutUs />}/>
  <Route path="/contactUs" element={<ContactUs />}/>
  <Route path="/buy" element={<Buy />}/>
  <Route path="/sell" element={<Sell />}/>
  </Route> 
</Routes>
</BrowserRouter>
  </StrictMode>,
)


