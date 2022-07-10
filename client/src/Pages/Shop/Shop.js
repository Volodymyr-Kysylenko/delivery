import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../../Components/Navbar/Navbar';
import ShopCard from '../../Components/ShopCard/ShopCard';
import ProductCard from '../../Components/ProductCard/ProductCard';

import './Shop.scss';

function Shop() {
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadShops = async () => {
            const response = await axios.get("http://localhost:5222/api/shops");
            setShops(response.data.reverse());
        }
        const loadProducts = async () => {
            const response = await axios.post("http://localhost:5222/api/products",
                { shop: 'Mc Donny' }
            );
            setProducts(response.data);
        }
        loadShops();
        loadProducts();
    }, []);

    const productsFilter = (e) => {
        const loadFilter = async () => {
            const response = await axios.post("http://localhost:5222/api/products", { shop: e.target.innerText });
            setProducts(response.data);
        }
        loadFilter();
    }

    return (
        <div className='Shop'>
            <Navbar />
            <div className='shop-container'>
                <aside className='product-filter'>
                    <div>
                        <h2 className='filter-title'>
                            Shops
                        </h2>
                        <p className='filter-desription'>
                            Choose a shop to order
                        </p>
                        {
                            shops.map(item => <ShopCard shopName={item} productsFilter={productsFilter} />)
                        }
                    </div>
                </aside>
                <div className='product-list'>
                    {
                        products.map((item) => <ProductCard id={item.id} key={'product' + item.id} img={'http://localhost:3000/images/' + item.id + '.jpg'} name={item.name} price={item.price} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Shop;
