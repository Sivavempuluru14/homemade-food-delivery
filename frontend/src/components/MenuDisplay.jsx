import { useState, useEffect } from 'react'
import axios from 'axios'

function MenuDisplay() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/menu')
      .then((res) => {
        setMenuItems(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Failed to load menu. Please check if the backend server is running.')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading menu...</p>
  if (error) return <p>{error}</p>
  if (menuItems.length === 0) return <p>No menu items found.</p>

  // Group items by category (Breakfast, Lunch, Dinner)
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <section className="menu">
      <h2>Today's Menu</h2>

      {Object.keys(groupedMenu).map((mealTime) => (
        <div key={mealTime} className="meal-group">
          <h3>{mealTime}</h3>
          <div className="meal-items">
            {groupedMenu[mealTime].map((item) => (
              <article key={item._id} className="meal-card">
                <button
                  type="button"
                  className="meal-image-button"
                  onClick={() => setSelectedItem(item)}
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

      {selectedItem && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedItem(null)}
        >
          <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close image"
            >
              ×
            </button>
            <img
              src={selectedItem.image || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={selectedItem.foodName}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default MenuDisplay