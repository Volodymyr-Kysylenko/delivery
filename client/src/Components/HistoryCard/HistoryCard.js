import React, { useState, useEffect } from 'react';
import './HistoryCard.scss';

function Card(props) {
    return(
        <p>{props.name} (x{props.amount})</p>
    )
}

function HistoryCard(props) {
    const [products, setProducts] = useState(props.products);

    useEffect(() => {
        
    }, []);

    return (
        <div className='history-item'>
            <h3 className='history-item-title'>Order №{props.number}</h3>
            <p className='history-item-time'>{props.time}</p>
            <p className='history-item-status'>Status: {props.status}</p>
            <div className='history-order'>
                {
                    products.map(item => <Card name={item.name} amount={item.amount}/>)
                }
            </div>
            <p className='history-price'>
                Total price: {props.totalPrice}$
            </p>
        </div>
    )
}

export default HistoryCard;