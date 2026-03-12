import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/styles/global.css';
import { Moods } from  './pages/moods'
import { AppContextProvider } from './context/AppContextProvider';
import { HomePage } from './pages/HomePage';
import { Explore } from './pages/explore';
import { Resolve } from './pages/resolve';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feelings" element={<Moods />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/resolve" element={<Resolve />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
)}

export default App;
