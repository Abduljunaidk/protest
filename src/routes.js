// src/routes.js
import React from 'react';
import { Route } from 'react-router-dom';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import ProductItem from './ProductItem';

function Routes() {
  return (
    <div>
      <Route path="/" exact component={ProductItem} />
      <Route path="/add" component={AddProductForm} />
      <Route path="/item" component={ProductList} />
    </div>
  );
}

export default Routes;
