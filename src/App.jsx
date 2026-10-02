import React from 'react';
import { ProductList } from './components/ProductList';

function App() {
    return (
        <main
            style={{
                minHeight: '100vh',
                backgroundColor: 'rgb(248 247 255)',
                padding: '40px 24px 60px',
                boxSizing: 'border-box',
                fontFamily:
                    'Arial, Helvetica, sans-serif',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                <header
                    style={{
                        textAlign: 'center',
                        marginBottom: '32px',
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: '42px',
                            fontWeight: '700',
                            color: '#1f2937',
                            letterSpacing: '-1px',
                        }}
                    >
                        Каталог товаров
                    </h1>

                    <p
                        style={{
                            margin: '10px 0 0',
                            color: '#6b7280',
                            fontSize: '17px',
                        }}
                    >
                        Выберите категорию и подходящий
                        диапазон цен
                    </p>
                </header>

                <ProductList />
            </div>
        </main>
    );
}

export default App;