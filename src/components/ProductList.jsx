import React from 'react';
import { useState, useEffect } from 'react';
import { Filters } from './Filters';
import { ProductCard } from './ProductCard';

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        categories: undefined,
        minPrice: 0,
        maxPrice: 9999,
    });

    // Загрузка товаров
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

    // Фильтрация
    useEffect(() => {
        let result = products;

        // Фильтр по нескольким категориям
        if (
            filters.categories &&
            filters.categories.length > 0
        ) {
            result = result.filter((product) =>
                filters.categories.includes(product.category)
            );
        }

        // Минимальная цена
        if (filters.minPrice !== undefined) {
            result = result.filter(
                (product) =>
                    product.price >= filters.minPrice
            );
        }

        // Максимальная цена
        if (filters.maxPrice !== undefined) {
            result = result.filter(
                (product) =>
                    product.price <= filters.maxPrice
            );
        }

        setFilteredProducts(result);
    }, [products, filters]);

    if (loading) {
        return (
            <p style={{ textAlign: 'center' }}>
                Загрузка товаров...
            </p>
        );
    }

    if (error) {
        return (
            <p
                style={{
                    color: 'red',
                    textAlign: 'center',
                }}
            >
                Ошибка: {error}
            </p>
        );
    }

    return (
        <section>
            <Filters
                onFilterChange={setFilters}
                initialFilters={filters}
            />

            {filteredProducts.length === 0 ? (
                <p
                    style={{
                        textAlign: 'center',
                        color: '#777',
                    }}
                >
                    Товары не найдены по выбранным
                    фильтрам.
                </p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}