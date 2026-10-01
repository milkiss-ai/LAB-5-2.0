import React from 'react';
import { ProductList } from './components/ProductList';

function App() {
    return (
        <main
            style={{
                padding: '0rem 2rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                fontFamily: 'Arial, sans-serif',
                boxSizing: 'border-box',
            }}
        >
            <h1
                style={{
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontSize: '2.5rem',
                }}
            >
                Каталог товаров
            </h1>

            <ProductList />
        </main>
    );
}

export default App;