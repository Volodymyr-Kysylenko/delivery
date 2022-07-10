import React, { useState } from 'react';
import axios from 'axios';

import Navbar from "../../Components/Navbar/Navbar";
import HistoryCard from '../../Components/HistoryCard/HistoryCard';

import './History.scss';

function History() {
    const [ordersHistory, setOrdersHistory] = useState([]);
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    function checkOrders() {

        const get = async () => {
            const res = await axios.post('http://localhost:5222/api/orders',
                {
                    email,
                    number,
                }
            );
            setOrdersHistory(res.data);
            console.log(res.data);
        }
        get();
    }

    return (
        <div>
            <Navbar />
            <div className='history'>
                <h2 className='history-title'>Orders History</h2>
                <p className='history-desc'>Enter your email, order number or both</p>
                <div className='history-search'>
                    <input className='history-search-email' onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <input className='history-search-number' onChange={(e) => setNumber(e.target.value)} value={number} type='number'></input>
                    <button className='history-search-btn' disabled={(email || number ? false : true)} onClick={checkOrders}>Find</button>
                </div>
                <div>
                    {
                        (ordersHistory.length === 0) 
                        ? <p className='history-search-not-found'>Orders not found</p> 
                        : ordersHistory.map((item) => <HistoryCard 
                            key={item.id} 
                            status = {item.status}
                            time={item.orderTime.split(' GMT')[0]} 
                            products={item.orderList} 
                            number={item.number} 
                            totalPrice={item.totalPrice}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default History;