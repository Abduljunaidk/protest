// src/ProductList.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { Card } from 'react-bootstrap'
import './style.css'

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('products').onSnapshot(snapshot => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="product-items pt-5">
        {products.map(product => (
          <div className='d-inline-flex' key={product.id}>
            <Card className="shadow p-3 m-2 bg-body rounded"  style={{ width: '15rem' }}>
              <Card.Img className='p-2' variant="top" src={product.imageUrl} style={{ height: '13rem' }} alt={product.name} />
              <Card.Body className="align-items-center">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
    </div>
);
}

export default ProductList;
