// src/AddProductForm.js
import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import ProductList from './ProductList';
import EditProductForm from './EditProductForm';
import { Form, Button, ProgressBar } from 'react-bootstrap';

function AddProductForm() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection('products').onSnapshot(snapshot => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImageUrl(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (productName && description && price && imageUrl) {
      try {
        const storageRef = storage.ref(`images/${imageUrl.name}`);
        const uploadTask = storageRef.put(imageUrl);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          error => {
            console.error('Error uploading image:', error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              // Add product to Firestore with the downloadURL
              db.collection('products').add({
                name: productName,
                description,
                price: parseFloat(price),
                imageUrl: downloadURL,
              });

              // Clear form inputs after submission
              setProductName('');
              setDescription('');
              setPrice('');
              setImageUrl('');
              setUploadProgress(0);
            });
          }
        );
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
    setProductName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
  };

  return (
    <div className="add-product-form container">
      <h2>Add New Product</h2>
      <Form>
        <Form.Group>
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {uploadProgress > 0 && <ProgressBar now={uploadProgress} variant="success" label={`${uploadProgress}% Success`}/>}
        </Form.Group>
        <Button className='mt-3' onClick={handleUpload}>Add Product</Button>
      </Form>

      <div className="existing-products mt-4">
        <h2 className='upload'>uploaded products</h2>
        <ProductList
          products={products}
          showDeleteButton={true}
          onEditProduct={handleEditProduct}
        />
      </div>

      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default AddProductForm;