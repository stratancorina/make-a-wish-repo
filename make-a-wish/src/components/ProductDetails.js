import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ProductDetails = ({ setIsOpen, product }) => {
    // console.log(product);
    return (
        <>
            <div className="modal">
                <div className="overlay-popup "></div>
                <div className="modal-content">
                    <div className='modal-section1'>
                        <img src={`data:image/jpeg;base64,${btoa(new Uint8Array(product.image.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`} alt={product.id} />
                    </div>
                    <div className='modal-section2'>
                    <div className='title1'>{product.name}</div>
                        <p className='modal-prod-description'>{product.description}</p>
                        <p className='modal-prod-price'>{product.price} lei</p>
                    </div>
                    <button className="close-modal" onClick={() => setIsOpen(false)}>
                        x
                    </button>
                </div>
            </div>

        </>

    );


}

export default ProductDetails
