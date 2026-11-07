import React from 'react';
import { useState, useEffect } from 'react';
import { Filters } from './Filters';
import { ProductCard } from './ProductCard';

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] =
        useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        categories: undefined,
        minPrice: 0,
        maxPrice: 9999,
    });

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    'https://fakestoreapi.com/products',
                    {
                        signal: controller.signal,
                    }
                );

                if (!res.ok) {
                    throw new Error(
                        `Ошибка сети: ${res.status}`
                    );
                }

                const data = await res.json();

                setProducts(data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        let result = products;

        if (
            filters.categories &&
            filters.categories.length > 0
        ) {
            result = result.filter((product) =>
                filters.categories.includes(
                    product.category
                )
            );
        }

        if (filters.minPrice !== undefined) {
            result = result.filter(
                (product) =>
                    product.price >=
                    filters.minPrice
            );
        }

        if (filters.maxPrice !== undefined) {
            result = result.filter(
                (product) =>
                    product.price <=
                    filters.maxPrice
            );
        }

        setFilteredProducts(result);
    }, [products, filters]);

    if (loading) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '60px',
                    color: '#6b7280',
                    fontSize: '18px',
                }}
            >
                Загрузка товаров...
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#dc2626',
                }}
            >
                Ошибка: {error}
            </div>
        );
    }

    return (
        <section>
  
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '28px 32px',
                    boxShadow:
                        '0 4px 20px rgba(0, 0, 0, 0.07)',
                    border: '1px solid #e5e7eb',
                    boxSizing: 'border-box',
                    marginBottom: '36px',
                }}
            >
                <h2
                    style={{
                        margin: '0 0 24px',
                        textAlign: 'center',
                        fontSize: '22px',
                        color: '#1f2937',
                    }}
                >
                    Фильтры
                </h2>

                <Filters
                    onFilterChange={setFilters}
                    initialFilters={filters}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '0 4px',
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: '24px',
                        color: '#1f2937',
                    }}
                >
                    Товары
                </h2>

                <span
                    style={{
                        color: '#6b7280',
                        fontSize: '15px',
                    }}
                >
                    Найдено товаров:{' '}
                    <strong
                        style={{
                            color: '#2563eb',
                        }}
                    >
                        {filteredProducts.length}
                    </strong>
                </span>
            </div>

            {filteredProducts.length === 0 ? (
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '40px',
                        textAlign: 'center',
                        color: '#6b7280',
                        border:
                            '1px solid #e5e7eb',
                    }}
                >
                    Товары не найдены по выбранным
                    фильтрам.
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '20px',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    {filteredProducts.map(
                        (product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        )
                    )}
                </div>
            )}
        </section>
    );
}