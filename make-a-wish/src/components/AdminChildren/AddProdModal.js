import React, { useState } from 'react';
import axios from 'axios';

function AddProdModal({ showModal, onCloseModal, onAddProduct }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('image', productData.image);

      console.log(productData);


      await axios.post('http://localhost:3001/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });

      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
      });
      onAddProduct();
      onCloseModal();
      console.log("produs adaugat")
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-add-prod">
          <div className="modal-add-content">
            <h2>Aauga un produs</h2>
            <label>
              Nume:
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Descriere:
              <input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Pret:
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Imagine:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <label>
              Categorie:
              <div>
              <label className='add-prod-l'>
                

                  <input
                    type="radio"
                    name="category"
                    value="cake"
                    checked={productData.category === 'cake'}
                    onChange={handleInputChange}
                  />
                <p>Tort</p>
                  
                </label>
                <label className='add-prod-l'>
                  
                  <input
                    type="radio"
                    name="category"
                    value="fruits"
                    checked={productData.category === 'fruits'}
                    onChange={handleInputChange}
                  />
                <p>Fructe</p>

                </label>
                <label className='add-prod-l'>
                  <input
                    type="radio"
                    name="category"
                    value="bouquet"
                    checked={productData.category === 'bouquet'}
                    onChange={handleInputChange}
                  />
                <p>Buchet DIY</p>
               
                </label>
                <label className='add-prod-l'>

                  <input
                    type="radio"
                    name="category"
                    value="flowers"
                    checked={productData.category === 'flowers'}
                    onChange={handleInputChange}
                  />
                <p>Flori</p>
                  
                </label>
              </div>
            </label>
            <div className="modal-actions">
              <button  className="login-register-button" onClick={handleAddProduct}>Adauga</button>
              <button  className="login-register-button cancel-btn"  onClick={onCloseModal}>Anuleaza</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProdModal