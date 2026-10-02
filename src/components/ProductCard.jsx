import React from 'react';

export function ProductCard({ product }) {
    return (
        <article
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '18px',
                border: '1px solid #e5e7eb',
                boxShadow:
                    '0 3px 12px rgba(0, 0, 0, 0.06)',
                boxSizing: 'border-box',
                minWidth: 0,
                transition:
                    'transform 0.2s ease',
            }}
        >
            {/* Фотография */}
            <div
                style={{
                    width: '100%',
                    height: '210px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9fafb',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                }}
            >
                <img
                    src={product.image}
                    alt={product.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '12px',
                        boxSizing:
                            'border-box',
                    }}
                />
            </div>

            {/* Название */}
            <h3
                style={{
                    margin: '0 0 10px',
                    fontSize: '16px',
                    lineHeight: '1.4',
                    color: '#1f2937',
                    minHeight: '45px',
                }}
            >
                {product.title}
            </h3>

            {/* Категория */}
            <p
                style={{
                    margin: '0 0 12px',
                    color: '#6b7280',
                    fontSize: '13px',
                }}
            >
                {product.category}
            </p>

            {/* Цена */}
            <p
                style={{
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#2563eb',
                }}
            >
                {product.price.toLocaleString(
                    'ru-RU'
                )}{' '}
                ₽
            </p>
        </article>
    );
}