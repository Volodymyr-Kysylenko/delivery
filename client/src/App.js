import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Shop from './Pages/Shop/Shop';
import Cart from './Pages/Cart/Cart';
import History from './Pages/History/History';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Shop />} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/history' element={<History />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
