import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from "../../Components/Navbar/Navbar";
import OrderCard from '../../Components/OrderCard/OrderCard';

import './Cart.scss';

function Cart() {
  const [order, setOrder] = useState([]);
  const [sum, setSum] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    loadOrder();
  }, [])

  const loadOrder = async () => {
    const storage = await (JSON.parse(sessionStorage.cart).sort((a, b) => a.id - b.id));
    const find = [];
    storage.map(i => {
      find.push(i.id);
    });

    const response = await axios.post("http://localhost:5222/api/order",
      { id: find }
    );
    const storagePrice = response.data;
    for (let i = 0; i < storagePrice.length; i++) {
      storagePrice[i].amount = storage[i].amount;
    }
    setOrder(() => storagePrice);
    totalPrice(storagePrice);
  }

  function updateData(value) {
    let sessionCart = JSON.parse(sessionStorage.cart);
    sessionCart.find((obj, i) => {
      if (obj.id === value) {
        sessionCart.splice(i, 1);
        return true;
      }
    });
    sessionStorage.setItem('cart', JSON.stringify(sessionCart));
    loadOrder();
  }

  function totalPrice(storagePrice) {
    let foo = 0;
    for (let i = 0; i < storagePrice.length; i++) {
      foo += Number(+storagePrice[i].amount * +(storagePrice[i].price * 100));
    }
    foo = foo / 100;
    setSum(foo);
    return foo;
  }

  function submit() {
    let orderList = [];
    order.map((i) => {
      orderList.push({ id: i.id, amount: i.amount, name: i.name, shop: i.shop, price: i.price })
    });

    const sendOrder = async () => {
      const response = await axios.post('http://localhost:5222/api/submit', {
        order: {
          number: '',
          name,
          email,
          phone,
          address,
          orderList,
          totalPrice: totalPrice(orderList),
          status: 'Processing',
          orderTime: String(new Date())
        }
      });
      alert('Order №' + response.data + ' is accepted!');
    }
    sendOrder();
  }

  return (
    <div className='App'>
      <Navbar />
      <div className='divider'>
        <div className='order-form'>
          <form autoComplete='off'>
            <h2 className='order-form-title'>Order form</h2>
            <label>
              <p>Name:</p>
              <input name='name' value={name} onChange={e => setName(e.target.value)} type='text'></input>
            </label>
            <label>
              <p>Email:</p>
              <input name='email' value={email} onChange={e => setEmail(e.target.value)} type='email'></input>
            </label>
            <label>
              <p>Phone:</p>
              <input name='phone' value={phone} onChange={e => setPhone(e.target.value)} type='tel'></input>
            </label>
            <label>
              <p>Address:</p>
              <input name='address' value={address} onChange={e => setAddress(e.target.value)} type='text'></input>
            </label>
            <div>{(name && email && phone && address && order) ? '' : 'All fields is required!'}</div>
          </form>
        </div>
        <div className='order-list'>
          {order.map(i => <OrderCard id={i.id} image={'http://localhost:3000/images/' + i.id + '.jpg'} price={i.price} name={i.name} updateData={updateData} loadOrder={loadOrder} />)}
        </div>
      </div>
      <div className='order-submit'>
        <span> Total price: {sum}$</span>
        <button disabled={(name && email && phone && address && order) ? false : true} onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default Cart;
