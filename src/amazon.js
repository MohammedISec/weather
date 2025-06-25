import React from 'react';
import './amazon.css';

const Amazon = () => {
    const products = [
        {
            id: 1,
            title: 'Laptop, 14.1Inch FHD IPS Screen, N4105 Processor, 6GB RAM 256GB SSD Expandable',
            price: 'AED 1,299',
            image: 'https://via.placeholder.com/150',
            rating: 5.0,
            shipping: 'Get it as soon as Tomorrow 8 AM - 12 PM',
        },
        {
            id: 2,
            title: 'Lenovo V15 G4 15.6" FHD Business Laptop Computer',
            price: 'AED 1,689',
            image: 'https://via.placeholder.com/150',
            rating: 4.2,
            shipping: 'Get it as soon as Friday, 18 April',
        },
        {
            id: 3,
            title: 'Dell Chromebook 3180 Renewed Business Laptop',
            price: 'AED 889',
            image: 'https://via.placeholder.com/150',
            rating: 3.6,
            shipping: 'Get it as soon as Friday, 18 April',
        },
        {
            id: 4,
            title: 'Victus 15.6 i5 Gaming Laptop',
            price: 'AED 2,358',
            image: 'https://via.placeholder.com/150',
            rating: 4.0,
            shipping: 'Get it as soon as Friday, 18 April - Monday, 21 April',
        },
    ];

    return (
        <div className="amazon-container">
            <div className="filters">
                <h3>Filters</h3>
                <div>
                    <label>
                        <input type="checkbox" /> Free Shipping
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" /> Fulfilled by Amazon
                    </label>
                </div>
            </div>
            <div className="products">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <p className="price">{product.price}</p>
                        <p className="rating">Rating: {product.rating} ★</p>
                        <p className="shipping">{product.shipping}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Amazon;