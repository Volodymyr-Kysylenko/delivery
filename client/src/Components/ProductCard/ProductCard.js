import React, { useState, useEffect } from 'react';

import './ProductCard.scss';

function ProductCard(props) {
    const [isInCart, setIsInCart] = useState('');

    useEffect(() => {
        if (!sessionStorage.cart) {
            sessionStorage.cart = JSON.stringify([]);
        }

        let sessionCart = JSON.parse(sessionStorage.cart);
        console.log(sessionCart);
        if (!sessionCart.find(obj => obj.id === String(props.id))) {
            setIsInCart('Add to Card');
        } else {
            setIsInCart('Delete from Cart');
        }
    }, []);

    const cartAdd = (e) => {
        let sessionCart = JSON.parse(sessionStorage.cart);

        if (!sessionCart.find(obj => obj.id === e.target.id)) {
            sessionCart.push({ id: e.target.id, amount: 1 });
            setIsInCart('Delete from Cart');
        } else {
            sessionCart.find((obj, i) => {
                if (obj.id === e.target.id) {
                    sessionCart.splice(i, 1);
                    return true;
                }
            });
            setIsInCart('Add to Card');
        }
        sessionStorage.setItem('cart', JSON.stringify(sessionCart));
    }

    return (
        <div className='product-item'>
            <div className='product-cover'>
                <img className='product-cover-image' src={props.img} alt={props.name} />
            </div>
            <div className='product-name'>
                <p className='product-name-text'>{props.name}</p>
            </div>
            <div className='product-price'>
                <p className='product-price-text'>{props.price}$</p>
            </div>
            <div className='product-btn'>
                <button className='product-btn-add' id={props.id} onClick={(e) => cartAdd(e)}>{isInCart}</button>
            </div>
        </div>
    )
}

export default ProductCard;