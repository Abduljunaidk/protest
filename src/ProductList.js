// src/ProductList.js
import React from 'react';
import { db,storage } from './firebase';
import { Table , Button } from 'react-bootstrap';
import './style.css'

function ProductList({ products, showDeleteButton, onEditProduct }) {
  const handleDelete = async productId => {
    try {
      const productRef = db.collection('products').doc(productId);
      const product = await productRef.get();
      const imageUrl = product.data().imageUrl;

      // Delete image from storage if imageUrl is present
      if (imageUrl) {
        const storageRef = storage.refFromURL(imageUrl);
        await storageRef.delete();
      }

      // Delete the product document from Firestore
      await productRef.delete();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Table className='tab' responsive striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td><img src={product.imageUrl} style={{ height: '50px', width: '50px', objectFit: 'cover'}} alt={product.name} className="img-thumbnail" /></td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
            <td>
              {showDeleteButton && (
                <Button className='btn-gap' variant="danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </Button>
              )}
              <Button className='btn-gap' variant="primary" onClick={() => onEditProduct(product)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductList;
