import { useProductStore } from '@/items/store/products.store';
import { useEffect } from 'react';

const Categories = () => {
const {categories, getCategories} = useProductStore()

useEffect(() => {
  getCategories()
}, [getCategories]);
console.log(categories);

    return (
        <div className="categories-container">
            <h1 className='text-white text-xl' >Categories</h1>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div key={category.category} className="category-card">
                        <h2 className='text-black font-semibold'>{category.category}</h2>
                        <p className="text-gray-700">
                            Cantidad: <strong>{category.total_products}</strong>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;