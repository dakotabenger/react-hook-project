import React from "react";
import { useState, useEffect } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {
    // TODO: Replace with state variable
    const sideOpenInit = localStorage.getItem("sideOpen") ? localStorage.getItem("sideOpen") : true
    const selectedProductInit = localStorage.getItem("product") ? localStorage.getItem("product") : ""

    const [sideOpen, setSideOpen] = useState(sideOpenInit);
    const [selectedProduct, setSelectedProduct] = useState(selectedProductInit);
    useEffect(() => {
        if (selectedProduct) {
        setSideOpen(true);
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (!sideOpen) setSelectedProduct("");
    },[sideOpen])

    useEffect(() => {
            localStorage.setItem("product",selectedProduct)
            localStorage.setItem("sideOpen",sideOpen)
        
})
    return (
        <div className="product-view">
            <div className="product-main-area">
                <h1>Products</h1>
                <div className="product-list">
                    {products.map(item =>
                        <ProductListItem
                            key={item.id}
                            product={item}
                            onClick={() => setSelectedProduct(item)}
                        />
                    )}
                </div>
            </div>
            <div className="product-side-panel">
                <div className="product-side-panel-toggle-wrapper">
                    <div className="product-side-panel-toggle"
                        onClick={() => setSideOpen(!sideOpen)}>
                        {sideOpen ? '>' : '<'}
                    </div>
                </div>
                <ProductDetails visible={sideOpen} product={selectedProduct} />
            </div>
        </div>
    );
}

export default ProductView;
