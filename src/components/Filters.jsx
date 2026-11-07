import React from 'react';

export function Filters({
    onFilterChange,
    initialFilters,
}) {
    const [localCategories, setLocalCategories] =
        React.useState(
            initialFilters.categories || []
        );

    const [localMinPrice, setLocalMinPrice] =
        React.useState(
            initialFilters.minPrice ?? 0
        );

    const [localMaxPrice, setLocalMaxPrice] =
        React.useState(
            initialFilters.maxPrice ?? 9999
        );

    const [errors, setErrors] =
        React.useState({});

    const validate = () => {
        const errs = {};

        const min = Number(localMinPrice);
        const max = Number(localMaxPrice);

        if (min < 0) {
            errs.min =
                'Цена не может быть отрицательной';
        }

        if (max < 0) {
            errs.max =
                'Цена не может быть отрицательной';
        }

        if (min > max) {
            errs.min =
                'Цена «от» больше цены «до»';

            errs.max =
                'Цена «до» меньше цены «от»';
        }

        return errs;
    };

    const handleApply = () => {
        const errs = validate();

        setErrors(errs);

        if (Object.keys(errs).length > 0) {
            return;
        }

        onFilterChange({
            categories:
                localCategories.length > 0
                    ? localCategories
                    : undefined,

            minPrice: Number(localMinPrice),

            maxPrice: Number(localMaxPrice),
        });
    };

    const handleCategoryChange = (
        category,
        checked
    ) => {
        setLocalCategories((prev) => {
            if (checked) {
                return [...prev, category];
            }

            return prev.filter(
                (item) => item !== category
            );
        });
    };

    const handleMinChange = (e) => {
        const value = Number(e.target.value);

        setLocalMinPrice(value);

        setErrors((prev) => ({
            ...prev,
            min: '',
        }));
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);

        setLocalMaxPrice(value);

        setErrors((prev) => ({
            ...prev,
            max: '',
        }));
    };

    return (
        <div
            style={{
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(3, minmax(0, 1fr))',
                    gap: '28px',
                    width: '100%',
                    boxSizing: 'border-box',
                }}
            >

                <div
                    style={{
                        minWidth: 0,
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '10px',
                            fontSize: '15px',
                        }}
                    >
                        Категория
                    </label>

                    <div
                        style={{
                            width: '100%',
                            boxSizing:
                                'border-box',
                            padding: '10px 12px',
                            border:
                                '1px solid #d1d5db',
                            borderRadius: '10px',
                            backgroundColor:
                                '#f9fafb',
                        }}
                    >
                        <label
                            style={{
                                display: 'block',
                                marginBottom:
                                    '9px',
                                cursor: 'pointer',
                                color: '#374151',
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={localCategories.includes(
                                    'electronics'
                                )}
                                onChange={(e) =>
                                    handleCategoryChange(
                                        'electronics',
                                        e.target
                                            .checked
                                    )
                                }
                                style={{
                                    marginRight:
                                        '9px',
                                    cursor: 'pointer',
                                }}
                            />
                            Электроника
                        </label>

                        <label
                            style={{
                                display: 'block',
                                marginBottom:
                                    '9px',
                                cursor: 'pointer',
                                color: '#374151',
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={localCategories.includes(
                                    'jewelery'
                                )}
                                onChange={(e) =>
                                    handleCategoryChange(
                                        'jewelery',
                                        e.target
                                            .checked
                                    )
                                }
                                style={{
                                    marginRight:
                                        '9px',
                                    cursor: 'pointer',
                                }}
                            />
                            Ювелирные изделия
                        </label>

                        <label
                            style={{
                                display: 'block',
                                marginBottom:
                                    '9px',
                                cursor: 'pointer',
                                color: '#374151',
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={localCategories.includes(
                                    "men's clothing"
                                )}
                                onChange={(e) =>
                                    handleCategoryChange(
                                        "men's clothing",
                                        e.target
                                            .checked
                                    )
                                }
                                style={{
                                    marginRight:
                                        '9px',
                                    cursor: 'pointer',
                                }}
                            />
                            Мужская одежда
                        </label>

                        <label
                            style={{
                                display: 'block',
                                cursor: 'pointer',
                                color: '#374151',
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={localCategories.includes(
                                    "women's clothing"
                                )}
                                onChange={(e) =>
                                    handleCategoryChange(
                                        "women's clothing",
                                        e.target
                                            .checked
                                    )
                                }
                                style={{
                                    marginRight:
                                        '9px',
                                    cursor: 'pointer',
                                }}
                            />
                            Женская одежда
                        </label>
                    </div>
                </div>

                <div
                    style={{
                        minWidth: 0,
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '10px',
                            fontSize: '15px',
                        }}
                    >
                        Цена от
                    </label>

                    <input
                        type="number"
                        value={localMinPrice}
                        onChange={handleMinChange}
                        min="0"
                        max="9999"
                        style={{
                            display: 'block',
                            width: '100%',
                            boxSizing:
                                'border-box',
                            padding:
                                '10px 12px',
                            border: errors.min
                                ? '1px solid #ef4444'
                                : '1px solid #d1d5db',
                            borderRadius: '10px',
                            outline: 'none',
                            fontSize: '15px',
                            backgroundColor:
                                '#f9fafb',
                        }}
                    />

                    <input
                        type="range"
                        min="0"
                        max="9999"
                        step="1"
                        value={localMinPrice}
                        onChange={handleMinChange}
                        style={{
                            display: 'block',
                            width: '100%',
                            marginTop: '16px',
                            cursor: 'pointer',
                        }}
                    />

                    {errors.min && (
                        <span
                            style={{
                                display: 'block',
                                color: '#dc2626',
                                fontSize:
                                    '13px',
                                marginTop: '6px',
                            }}
                        >
                            {errors.min}
                        </span>
                    )}
                </div>

                <div
                    style={{
                        minWidth: 0,
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '10px',
                            fontSize: '15px',
                        }}
                    >
                        Цена до
                    </label>

                    <input
                        type="number"
                        value={localMaxPrice}
                        onChange={handleMaxChange}
                        min="0"
                        max="9999"
                        style={{
                            display: 'block',
                            width: '100%',
                            boxSizing:
                                'border-box',
                            padding:
                                '10px 12px',
                            border: errors.max
                                ? '1px solid #ef4444'
                                : '1px solid #d1d5db',
                            borderRadius: '10px',
                            outline: 'none',
                            fontSize: '15px',
                            backgroundColor:
                                '#f9fafb',
                        }}
                    />

                    <input
                        type="range"
                        min="0"
                        max="9999"
                        step="1"
                        value={localMaxPrice}
                        onChange={handleMaxChange}
                        style={{
                            display: 'block',
                            width: '100%',
                            marginTop: '16px',
                            cursor: 'pointer',
                        }}
                    />

                    {errors.max && (
                        <span
                            style={{
                                display: 'block',
                                color: '#dc2626',
                                fontSize:
                                    '13px',
                                marginTop: '6px',
                            }}
                        >
                            {errors.max}
                        </span>
                    )}
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '28px',
                }}
            >
                <button
                    onClick={handleApply}
                    style={{
                        padding:
                            '11px 28px',
                        backgroundColor:
                            '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: '600',
                        boxShadow:
                            '0 3px 8px rgba(37, 99, 235, 0.25)',
                    }}
                >
                    Применить фильтры
                </button>
            </div>
        </div>
    );
}