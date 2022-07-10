import React, { useState, useEffect } from 'react';

import './OrderCard.scss';

function OrderCard(props) {
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        let sessionCart = JSON.parse(sessionStorage.cart);
        sessionCart.find((obj, i) => {
            if (obj.id === String(props.id)) {
                setAmount(sessionCart[i].amount);
                return true;
            }
        });
    });

    function chekInputValue(e) {
        if (e.target.value == null || Number(e.target.value) <= 0) {
            e.target.value = 1;
            setAmount(1);
        } else {
            setAmount(e.target.value);
        }
        setInputValue(e.target.id, e.target.value)
    }

    function setInputValue(id, value) {
    let sessionCart = JSON.parse(sessionStorage.cart);
        sessionCart.find((obj, i) => {
            if (obj.id === id) {
                sessionCart[i].amount = Number(value);
                return true;
            }
        });
        sessionStorage.setItem('cart', JSON.stringify(sessionCart));
        props.loadOrder();
    }

    function decAmount(e) {
        let el = e.target.nextElementSibling;
        let val = (el.value >= 2) ? (Number(el.value)) - 1: 1;
        setInputValue(el.id, val);
    }

    function incAmount(e) {
        let el = e.target.previousElementSibling;
        let val = (el.value <= 999) ? (Number(el.value)) + 1: 999;
        setInputValue(el.id, val);
    }

    return (
        <div className='order-item'>
            <div className='order-item-image'>
                <img src={props.image} />
            </div>
            <div className='order-item-control'>
                <div className='order-item-name'>{props.name}</div>
                <div className='order-item-amount'>
                    <label>
                        Amount: 
                        <button className='order-item-amount-btn' onClick={e => decAmount(e)}>-</button>
                        <input className='order-item-amount-input' id={props.id} min='1' max='999' name='amount' type='number' onChange={e => chekInputValue(e)} value={amount}></input>
                        <button className='order-item-amount-btn' onClick={e => incAmount(e)}>+</button>
                    </label>
                </div>
                <div className='order-item-price'>Price: {((+props.price * 100) * + amount) / 100}$</div>
                <div className='order-item-delete-btn'>
                    <button id={props.id} onClick={(e) => { props.updateData(e.target.id) }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default OrderCard