// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import ProductItem from './ProductItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>A T store</h1>
        <Routes>
          <Route path="/" exact element={<ProductItem/>} />
          <Route path="/add" element={<AddProductForm />} />
          <Route path="/item" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
