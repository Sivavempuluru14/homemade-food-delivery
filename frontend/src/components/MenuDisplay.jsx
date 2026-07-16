import { useState, useEffect } from 'react'
import axios from 'axios'

const initialFormState = {
  foodName: '',
  category: 'Breakfast',
  price: '',
  description: '',
  image: '',
}

function MenuDisplay({ adminAction, onAdminActionChange }) {
  const [selectedModalItem, setSelectedModalItem] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [selectedEditId, setSelectedEditId] = useState('')
  const [selectedDeleteId, setSelectedDeleteId] = useState('')

  const fetchMenu = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await axios.get('http://localhost:5000/api/menu')
      setMenuItems(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load menu. Please check if the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  useEffect(() => {
    if (adminAction === 'add') {
      setFormData(initialFormState)
      setSelectedEditId('')
      setSelectedDeleteId('')
    } else if (adminAction === 'edit') {
      setFormData(initialFormState)
      setSelectedEditId('')
      setSelectedDeleteId('')
    } else if (adminAction === 'delete') {
      setSelectedEditId('')
      setSelectedDeleteId('')
    }
  }, [adminAction])

  useEffect(() => {
    if (adminAction !== 'edit' || !selectedEditId) return

    const selectedEntry = menuItems.find((item) => item._id === selectedEditId)
    if (selectedEntry) {
      setFormData({
        foodName: selectedEntry.foodName || '',
        category: selectedEntry.category || 'Breakfast',
        price: selectedEntry.price ?? '',
        description: selectedEntry.description || '',
        image: selectedEntry.image || '',
      })
    }
  }, [adminAction, menuItems, selectedEditId])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSuccessMessage('')

    if (!formData.foodName.trim() || !formData.category || !formData.price) {
      setError('Food name, category and price are required.')
      return
    }

    setIsSubmitting(true)

    try {
      await axios.post('http://localhost:5000/api/menu', {
        ...formData,
        price: Number(formData.price),
      })
      setSuccessMessage('Item added successfully.')
      setFormData(initialFormState)
      await fetchMenu()
      onAdminActionChange(null)
    } catch (err) {
      console.error(err)
      setError('Unable to add the menu item right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSuccessMessage('')

    if (!selectedEditId) {
      setError('Please choose an item to update.')
      return
    }

    if (!formData.foodName.trim() || !formData.category || !formData.price) {
      setError('Food name, category and price are required.')
      return
    }

    setIsSubmitting(true)

    try {
      await axios.put(`http://localhost:5000/api/menu/${selectedEditId}`, {
        ...formData,
        price: Number(formData.price),
      })
      setSuccessMessage('Item updated successfully.')
      setFormData(initialFormState)
      setSelectedEditId('')
      await fetchMenu()
      onAdminActionChange(null)
    } catch (err) {
      console.error(err)
      setError('Unable to update the selected item.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSubmit = async () => {
    if (!selectedDeleteId) {
      setError('Please choose an item to delete.')
      return
    }

    setError(null)
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      await axios.delete(`http://localhost:5000/api/menu/${selectedDeleteId}`)
      setSuccessMessage('Item deleted successfully.')
      setSelectedDeleteId('')
      await fetchMenu()
      onAdminActionChange(null)
    } catch (err) {
      console.error(err)
      setError('Unable to delete the selected item.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <section className="menu">
      <div className="menu-heading-row">
        <h2>Today's Menu</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      {adminAction && (
        <div className="menu-admin-panel">
          {adminAction === 'add' && (
            <form onSubmit={handleAddSubmit} className="menu-form">
              <h3>Add Item</h3>
              <label>
                Food Name
                <input name="foodName" value={formData.foodName} onChange={handleInputChange} required />
              </label>
              <label>
                Category
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </label>
              <label>
                Price
                <input type="number" name="price" min="0" step="0.01" value={formData.price} onChange={handleInputChange} required />
              </label>
              <label>
                Description
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
              </label>
              <label>
                Image URL
                <input name="image" value={formData.image} onChange={handleInputChange} />
              </label>
              <div className="form-actions">
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</button>
                <button type="button" className="secondary-btn" onClick={() => onAdminActionChange(null)}>
                  Close
                </button>
              </div>
            </form>
          )}

          {adminAction === 'edit' && (
            <div className="menu-form">
              <h3>Edit Item</h3>
              <label>
                Choose Item
                <select value={selectedEditId} onChange={(event) => setSelectedEditId(event.target.value)}>
                  <option value="">Select an item</option>
                  {menuItems.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.foodName}
                    </option>
                  ))}
                </select>
              </label>

              {selectedEditId && (
                <form onSubmit={handleEditSubmit}>
                  <label>
                    Food Name
                    <input name="foodName" value={formData.foodName} onChange={handleInputChange} required />
                  </label>
                  <label>
                    Category
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </label>
                  <label>
                    Price
                    <input type="number" name="price" min="0" step="0.01" value={formData.price} onChange={handleInputChange} required />
                  </label>
                  <label>
                    Description
                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
                  </label>
                  <label>
                    Image URL
                    <input name="image" value={formData.image} onChange={handleInputChange} />
                  </label>
                  <div className="form-actions">
                    <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
                    <button type="button" className="secondary-btn" onClick={() => onAdminActionChange(null)}>
                      Close
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {adminAction === 'delete' && (
            <div className="menu-form">
              <h3>Delete Item</h3>
              <label>
                Choose Item for Deletion
                <select value={selectedDeleteId} onChange={(event) => setSelectedDeleteId(event.target.value)}>
                  <option value="">Select an item</option>
                  {menuItems.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.foodName}
                    </option>
                  ))}
                </select>
              </label>
              <div className="form-actions">
                <button type="button" disabled={!selectedDeleteId || isSubmitting} onClick={handleDeleteSubmit}>
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
                <button type="button" className="secondary-btn" onClick={() => onAdminActionChange(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {loading && menuItems.length === 0 && <p>Loading menu...</p>}
      {!loading && error && <p className="error-message">{error}</p>}
      {!loading && !error && menuItems.length === 0 && <p>No menu items found.</p>}

      {!loading && !error && menuItems.length > 0 && (
        <>
          {Object.keys(groupedMenu).map((mealTime) => (
            <div key={mealTime} className="meal-group">
              <h3>{mealTime}</h3>
              <div className="meal-items">
                {groupedMenu[mealTime].map((item) => (
                  <article key={item._id} className="meal-card">
                    <button
                      type="button"
                      className="meal-image-button"
                      onClick={() => setSelectedModalItem(item)}
                      aria-label={`View ${item.foodName}`}
                    >
                      <img
                        src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={item.foodName}
                        className="meal-image"
                      />
                    </button>
                    <div className="meal-content">
                      <h4>{item.foodName}</h4>
                      <p>{item.description}</p>
                      <span>₹{item.price}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {selectedModalItem && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedModalItem(null)}
        >
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedModalItem(null)}
              aria-label="Close image"
            >
              ×
            </button>
            <img
              src={selectedModalItem.image || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={selectedModalItem.foodName}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default MenuDisplay