// src/EditProductForm.js
import React, { useState } from 'react';
import { db } from './firebase';
import { Form, Button } from 'react-bootstrap';
import './style.css'

function EditProductForm({ product, onClose }) {
  const [newName, setNewName] = useState(product.name);
  const [newDescription, setNewDescription] = useState(product.description);
  const [newPrice, setNewPrice] = useState(product.price);

  const handleEdit = async () => {
    try {
      await db.collection('products').doc(product.id).update({
        name: newName,
        description: newDescription,
        price: parseFloat(newPrice),
      });
      onClose(); // Close the edit form after editing
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <div className="edit-product-form container">
      <h3>Edit Product</h3>
      <Form>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={newPrice}
            onChange={e => setNewPrice(e.target.value)}
          />
        </Form.Group>
        <Button className='btn-gap mt-3' variant="primary" onClick={handleEdit}>
          Save
        </Button>
        <Button className='btn-gap mt-3' variant="danger" onClick={onClose}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default EditProductForm;
