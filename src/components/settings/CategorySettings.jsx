import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import '../../styles/CategorySettings.css';

const CategorySettings = ({ onUpdate }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food & Dining', color: '#6366f1' },
    { id: 2, name: 'Transportation', color: '#f59e0b' },
    { id: 3, name: 'Shopping', color: '#ef4444' },
    { id: 4, name: 'Entertainment', color: '#10b981' },
    { id: 5, name: 'Bills & Utilities', color: '#8b5cf6' },
  ]);

  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#6366f1' });

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category = {
        id: Date.now(),
        name: newCategory.name.trim(),
        color: newCategory.color
      };
      setCategories(prev => [...prev, category]);
      setNewCategory({ name: '', color: '#6366f1' });
      onUpdate([...categories, category]);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (editingCategory.name.trim()) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingCategory.id ? editingCategory : cat
        )
      );
      setEditingCategory(null);
      onUpdate(categories.map(cat =>
        cat.id === editingCategory.id ? editingCategory : cat
      ));
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    onUpdate(categories.filter(cat => cat.id !== categoryId));
  };

  return (
    <div className="category-settings">
      <h2>Category Settings</h2>

      <div className="add-category">
        <div className="form-group">
          <input
            type="text"
            placeholder="New category name"
            value={newCategory.name}
            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
          />
          <button onClick={handleAddCategory} className="add-button">
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <div className="categories-list">
        {categories.map(category => (
          <div key={category.id} className="category-item">
            {editingCategory?.id === category.id ? (
              <form onSubmit={handleUpdateCategory} className="edit-form">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory(prev => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="color"
                  value={editingCategory.color}
                  onChange={(e) =>
                    setEditingCategory(prev => ({ ...prev, color: e.target.value }))
                  }
                />
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setEditingCategory(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="category-info">
                  <div
                    className="color-dot"
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                </div>
                <div className="category-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditCategory(category)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySettings; 