function ShopCard(props) {
    return(
            <button onClick={(e) => {props.productsFilter(e)}} className='filter-select-shop'>
                {props.shopName}
            </button>
    )
}

export default ShopCard;