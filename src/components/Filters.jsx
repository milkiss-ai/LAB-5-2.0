import React from 'react';

export function Filters({ onFilterChange, initialFilters }) {
    const [localCategories, setLocalCategories] = React.useState(
        initialFilters.categories || []
    );

    const [localMinPrice, setLocalMinPrice] = React.useState(
        initialFilters.minPrice ?? 0
    );

    const [localMaxPrice, setLocalMaxPrice] = React.useState(
        initialFilters.maxPrice ?? 9999
    );

    const [errors, setErrors] = React.useState({});

    const validate = () => {
        const errs = {};

        const min = Number(localMinPrice);
        const max = Number(localMaxPrice);

        if (min < 0) {
            errs.min = 'Цена не может быть отрицательной';
        }

        if (max < 0) {
            errs.max = 'Цена не может быть отрицательной';
        }

        if (min > max) {
            errs.min =
                'Цена «от» не может быть больше цены «до»';

            errs.max =
                'Цена «до» не может быть меньше цены «от»';
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

    const handleCategoryChange = (category, checked) => {
        setLocalCategories((prev) => {
            if (checked) {
                return [...prev, category];
            }

            return prev.filter((item) => item !== category);
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
                marginBottom: '2rem',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(3, minmax(0, 1fr))',
                    gap: '2rem',
                    width: '100%',
                    marginBottom: '2rem',
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
                            textAlign: 'center',
                            marginBottom: '8px',
                        }}
                    >
                        Категория
                    </label>

                    <div
                        style={{
                            width: '100%',
                            height: '85px',
                            overflowY: 'auto',
                            boxSizing: 'border-box',
                            padding: '8px 12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                        }}
                    >
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '7px',
                                cursor: 'pointer',
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
                                        e.target.checked
                                    )
                                }
                                style={{
                                    marginRight: '8px',
                                }}
                            />

                            Электроника
                        </label>

                        <label
                            style={{
                                display: 'block',
                                marginBottom: '7px',
                                cursor: 'pointer',
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
                                        e.target.checked
                                    )
                                }
                                style={{
                                    marginRight: '8px',
                                }}
                            />

                            Ювелирные изделия
                        </label>

                        <label
                            style={{
                                display: 'block',
                                marginBottom: '7px',
                                cursor: 'pointer',
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
                                        e.target.checked
                                    )
                                }
                                style={{
                                    marginRight: '8px',
                                }}
                            />

                            Мужская одежда
                        </label>

                        <label
                            style={{
                                display: 'block',
                                cursor: 'pointer',
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
                                        e.target.checked
                                    )
                                }
                                style={{
                                    marginRight: '8px',
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
                            textAlign: 'center',
                            marginBottom: '8px',
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
                            boxSizing: 'border-box',
                            padding: '8px 12px',
                            border: errors.min
                                ? '1px solid red'
                                : '1px solid #ccc',
                            borderRadius: '4px',
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
                            marginTop: '10px',
                            boxSizing: 'border-box',
                        }}
                    />

                    {errors.min && (
                        <span
                            style={{
                                display: 'block',
                                color: 'red',
                                fontSize: '0.85rem',
                                marginTop: '4px',
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
                            textAlign: 'center',
                            marginBottom: '8px',
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
                            boxSizing: 'border-box',
                            padding: '8px 12px',
                            border: errors.max
                                ? '1px solid red'
                                : '1px solid #ccc',
                            borderRadius: '4px',
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
                            marginTop: '10px',
                            boxSizing: 'border-box',
                        }}
                    />

                    {errors.max && (
                        <span
                            style={{
                                display: 'block',
                                color: 'red',
                                fontSize: '0.85rem',
                                marginTop: '4px',
                            }}
                        >
                            {errors.max}
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={handleApply}
                style={{
                    display: 'block',
                    margin: '0 auto',
                    padding: '10px 24px',
                    background: '#2563eb',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                }}
            >
                Применить фильтры
            </button>
        </div>
    );
}