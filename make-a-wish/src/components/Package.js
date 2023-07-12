import React from 'react';
import "../Pages.css";
import { Link } from 'react-router-dom';

const Package = ({ imageUrl, title, description, price }) => {
    return (
        <Link className='pachet-container' to="/comanda">
                <>
                    <div className="pct-image-container">
                        <img src={imageUrl} alt={title} />
                    </div>

                    <div className='pct-title-container'>
                        <p>{title}</p>
                        <p>{description}</p>
                        <p>{price} lei</p>
                    </div>
                </>

        </Link>
    );
};

export default Package;